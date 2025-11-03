import authSeller from "@/lib/authSeller"
import Address from "@/models/Address";
import { getAuth }  from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";

import connectToDatabase from "@/config/db";



export async function GET(request) {
try {
    const { userId } = getAuth(request)
    const isSeller = await authSeller(userId)

    if (!isSeller) {
        return NextResponse.json({ success: false, message: "Unauthorized" })
    }

    await connectToDatabase();
    // fetch seller orders
    const orders = await Order.find({ })
        .populate('address')
        .populate('items.product')
        .lean();

    // Add effectivePrice to products
    const enrichedOrders = orders.map(order => ({
        ...order,
        items: order.items.map(item => ({
            ...item,
            product: item.product ? {
                ...item.product,
                effectivePrice: item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price
            } : null
        }))
    }));

    return NextResponse.json({ success: true, orders: enrichedOrders });

} catch (error) {
     return NextResponse.json({ success: false, message: error.message })

}
}