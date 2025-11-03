import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/Users";
import connectToDatabase from "@/config/db";


export async function POST(request){

try {
    
const {userId}=getAuth(request);
const {cartData}=await request.json();

console.log('Cart update API called by userId:', userId);
console.log('Cart data received:', JSON.stringify(cartData, null, 2));

// Validate cartData structure
if (typeof cartData !== 'object' || cartData === null) {
  console.error('Invalid cart data format - not an object');
  return NextResponse.json({ success: false, message: "Invalid cart data format" });
}

// Validate each cart item
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

const normalizedCartData = {};

for (const [cartKey, itemData] of Object.entries(cartData)) {
  const [rawProductId, ...colorSegments] = cartKey.split('_');
  const colorFromKey = colorSegments.length ? colorSegments.join('_') : null;

  const baseItem =
    typeof itemData === 'object' && itemData !== null
      ? { ...itemData }
      : { quantity: Number(itemData) || 0 };

  if (!baseItem.quantity || typeof baseItem.quantity !== 'number') {
    console.error(`Invalid quantity for cart key ${cartKey}:`, baseItem.quantity);
    throw new Error('Each cart item must include a valid quantity');
  }

  const providedHex = typeof baseItem.color === 'string' ? baseItem.color.trim() : '';
  const providedName = typeof baseItem.colorName === 'string' ? baseItem.colorName.trim() : '';

  let resolvedColorName = providedName || colorFromKey || '';
  if (!resolvedColorName && providedHex.startsWith('#')) {
    resolvedColorName = getColorNameFromHex(providedHex) || 'Custom';
  }
  if (!resolvedColorName) {
    resolvedColorName = 'Default';
  }

  let resolvedHex = null;
  if (providedHex.startsWith('#')) {
    resolvedHex = providedHex.toUpperCase();
  } else if (colorNameMap[resolvedColorName]) {
    resolvedHex = colorNameMap[resolvedColorName];
  } else if (resolvedColorName === 'Default') {
    resolvedHex = '#FFFFFF';
  }

  normalizedCartData[cartKey] = {
    ...baseItem,
    productId: baseItem.productId || rawProductId,
    quantity: baseItem.quantity,
    colorName: resolvedColorName,
    color: resolvedHex,
    colorHex: resolvedHex,
  };
}

console.log('Normalized cart data:', JSON.stringify(normalizedCartData, null, 2));

await connectToDatabase();
let user=await User.findById(userId);

if (!user) {
  console.log('User not found in DB, creating new user with userId:', userId);
  // Get user info from Clerk using clerkClient
  const { createClerkClient } = await import('@clerk/nextjs/server');
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  
  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    if (clerkUser) {
      user = new User({
        _id: userId,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        imageUrl: clerkUser.imageUrl || '',
        cartItems: normalizedCartData
      });
      await user.save();
      console.log('New user created successfully');
    } else {
      console.error('Could not get Clerk user data');
      return NextResponse.json({ success: false, message: "User not found and could not create" });
    }
  } catch (createError) {
    console.error('Error creating user:', createError);
    return NextResponse.json({ success: false, message: "User not found in database" });
  }
} else {
  console.log('Current cart items in DB:', user.cartItems);
  user.cartItems=normalizedCartData;
  await user.save();
  console.log('Cart items saved to DB:', user.cartItems);
}

return NextResponse.json({success:true,message:"Cart updated successfully"})


} catch (error) {
  console.error('Cart update error:', error.message);
  return  NextResponse.json({success:false,message:error.message})
}


}