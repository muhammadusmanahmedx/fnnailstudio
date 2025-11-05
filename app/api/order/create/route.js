import { getAuth, clerkClient } from "@clerk/nextjs/server";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Address from "@/models/Address";
import { sendSellerOrderNotification } from "@/lib/sendEmail";

const colorNameMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Red: "#FF0000",
  Green: "#00FF00",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Magenta: "#FF00FF",
  Cyan: "#00FFFF",
  Orange: "#FFA500",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  Gray: "#808080",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Lavender: "#E6E6FA",
  Khaki: "#F0E68C",
  "Light Green": "#90EE90",
  "Sky Blue": "#87CEEB",
  "Hot Pink": "#FF69B4",
  Default: "#FFFFFF",
};

const getColorNameFromHex = (hex) => {
  if (!hex || typeof hex !== "string") return null;
  const formattedHex = hex.trim().toUpperCase();
  const match = Object.entries(colorNameMap).find(
    ([, mapHex]) => mapHex.toUpperCase() === formattedHex
  );
  return match ? match[0] : null;
};

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { items, address } = await request.json();

    console.log('=== ORDER CREATION DEBUG ===');
    console.log('Received items:', JSON.stringify(items, null, 2));

    if (!address || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // connect DB
    await connectToDatabase();

    // calculate total amount properly
    let amount = 0;
    for (const item of items) {
      // Extract product ID from composite key (format: productId_color)
      const productId = item.product?.split('_')[0] || item.product;
      const product = await Product.findById(productId);
      if (!product) continue;
      const effectivePrice = product.offerPrice > 0 ? product.offerPrice : product.price;
      amount += effectivePrice * item.quantity;
    }

    // create order in DB
    const orderItems = items.map((i) => {
      // Extract product ID and color name from composite key (format: productId_colorName)
      const compositeKey = typeof i.product === "string" ? i.product : "";
      const [rawProductId, ...colorParts] = compositeKey.split("_");
      const productId = i.productId || rawProductId || compositeKey;
      const colorFromKey = colorParts.length ? colorParts.join("_") : null;

      const providedColorName = typeof i.colorName === "string" ? i.colorName.trim() : "";
      const providedHex = typeof i.colorHex === "string"
        ? i.colorHex.trim()
        : (typeof i.color === "string" ? i.color.trim() : "");

      let normalizedColorName = providedColorName || (colorFromKey || "").trim();
      if (!normalizedColorName && providedHex.startsWith("#")) {
        normalizedColorName = getColorNameFromHex(providedHex) || "Custom";
      }
      if (!normalizedColorName) {
        normalizedColorName = "Default";
      }

      let normalizedColorHex = null;
      if (providedHex.startsWith("#")) {
        normalizedColorHex = providedHex.toUpperCase();
      } else if (colorNameMap[normalizedColorName]) {
        normalizedColorHex = colorNameMap[normalizedColorName];
      } else if (normalizedColorName === "Default") {
        normalizedColorHex = "#FFFFFF";
      }

      console.log("Creating order item:", {
        originalItem: i,
        productId,
        colorName: normalizedColorName,
        colorHex: normalizedColorHex,
        colorFromKey,
        providedHex,
      });

      return {
        product: productId, // must be ObjectId
        quantity: i.quantity,
        color: normalizedColorName,
        colorHex: normalizedColorHex,
      };
    });

    console.log("Order items to save:", JSON.stringify(orderItems, null, 2));

    const order = await Order.create({
      userId,
      items: orderItems,
      address: address._id || address, // must be ObjectId
      amount: amount + Math.floor(amount * 0.02),
      date: Date.now(),
    });

    console.log("Order created in DB - ID:", order._id);
    console.log("Order items from created order:", JSON.stringify(order.items, null, 2));
    
    // Verify by fetching the order again
    const verifyOrder = await Order.findById(order._id).lean();
    console.log("Verification - Order items from DB fetch:", JSON.stringify(verifyOrder.items, null, 2));

    // clear user cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    // === SEND EMAIL NOTIFICATIONS TO SELLERS ===
    try {
      // Fetch customer details
      const client = await clerkClient();
      const customer = await client.users.getUser(userId);
      
      // Fetch address details
      const addressDetails = await Address.findById(address._id || address);
      
      // Group order items by seller
      const sellerOrders = {};
      
      for (const orderItem of orderItems) {
        const product = await Product.findById(orderItem.product);
        if (!product) continue;
        
        const sellerId = product.userId;
        if (!sellerOrders[sellerId]) {
          sellerOrders[sellerId] = [];
        }
        
        sellerOrders[sellerId].push({
          product: product,
          quantity: orderItem.quantity,
          color: orderItem.color,
          colorHex: orderItem.colorHex,
        });
      }
      
      // Send email to each seller
      const emailPromises = [];
      for (const [sellerId, items] of Object.entries(sellerOrders)) {
        try {
          const seller = await client.users.getUser(sellerId);
          
          // Check if user is a seller
          if (seller.publicMetadata?.role === 'seller') {
            const orderData = {
              order: order,
              address: {
                street: addressDetails.area || '',
                city: addressDetails.city || '',
                state: '',
                zipCode: addressDetails.pinCode || '',
                country: 'Pakistan',
                phone: addressDetails.phoneNumber || '',
              }
            };
            
            const customerData = {
              name: addressDetails.fullName || customer.firstName + ' ' + customer.lastName || 'Customer',
              email: customer.emailAddresses[0]?.emailAddress || '',
            };
            
            // Send email (non-blocking)
            emailPromises.push(
              sendSellerOrderNotification(seller, items, orderData, customerData)
                .catch(err => console.error(`Failed to send email to seller ${sellerId}:`, err))
            );
          }
        } catch (error) {
          console.error(`Error processing seller ${sellerId}:`, error);
        }
      }
      
      // Wait for all emails to be sent (but don't block the response)
      await Promise.allSettled(emailPromises);
      console.log(`Sent ${emailPromises.length} seller notification emails`);
      
    } catch (emailError) {
      // Log error but don't fail the order
      console.error('Error sending seller notifications:', emailError);
    }

    return NextResponse.json({ success: true, message: "Order placed successfully", order });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
