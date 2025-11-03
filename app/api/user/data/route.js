import { useAuth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db";
import User from "@/models/Users";


export async function GET(request) {
    try {

        const { userId } = getAuth(request)
        
        console.log('User data API called for userId:', userId);

        await connectToDatabase();
        let user = await User.findById(userId);


        if (!user) {
            console.log('User not found in DB, attempting to create from Clerk data');
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
                        cartItems: {}
                    });
                    await user.save();
                    console.log('New user created successfully');
                } else {
                    console.error('Could not get Clerk user data');
                    return NextResponse.json({ success: "false", message: "User not found and could not create" });
                }
            } catch (createError) {
                console.error('Error creating user:', createError.message);
                return NextResponse.json({ success: "false", message: "User not found" });
            }
        }
        
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

        const normalizeCartItems = (items) => {
            if (!items || typeof items !== 'object') return {};
            const normalized = {};

            for (const [cartKey, value] of Object.entries(items)) {
                const [rawProductId, ...colorSegments] = cartKey.split('_');
                const colorFromKey = colorSegments.length ? colorSegments.join('_') : null;

                const baseItem =
                    typeof value === 'object' && value !== null
                        ? { ...value }
                        : { quantity: Number(value) || 0 };

                if (!baseItem.quantity || typeof baseItem.quantity !== 'number') {
                    continue;
                }

                const providedHex = typeof baseItem.color === 'string' ? baseItem.color.trim() : '';
                const providedName = typeof baseItem.colorName === 'string' ? baseItem.colorName.trim() : '';

                let resolvedColorName = providedName || colorFromKey || '';
                if (!resolvedColorName && providedHex.startsWith('#')) {
                    const match = Object.entries(colorNameMap).find(([, hex]) => hex.toUpperCase() === providedHex.toUpperCase());
                    resolvedColorName = match ? match[0] : 'Custom';
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

                normalized[cartKey] = {
                    ...baseItem,
                    productId: baseItem.productId || rawProductId,
                    quantity: baseItem.quantity,
                    colorName: resolvedColorName,
                    color: resolvedHex,
                    colorHex: resolvedHex,
                };
            }

            return normalized;
        };

        const normalizedCartItems = normalizeCartItems(user.cartItems);

        if (JSON.stringify(normalizedCartItems) !== JSON.stringify(user.cartItems)) {
            user.cartItems = normalizedCartItems;
            await user.save();
        }

        console.log('User found, cart items:', normalizedCartItems);
        return NextResponse.json({ success: "true", user: { ...user.toObject(), cartItems: normalizedCartItems } })

    } catch (error) {
        console.error('User data fetch error:', error.message);
        return NextResponse.json({ success: "false", message: error.message })
    }




}