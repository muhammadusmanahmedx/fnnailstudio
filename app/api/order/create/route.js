import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

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

    return NextResponse.json({ success: true, message: "Order placed successfully", order });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
