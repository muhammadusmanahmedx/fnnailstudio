'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const MyOrders = () => {
    const { currency, getToken, user } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const colorNameMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Red': '#FF0000',
        'Green': '#00FF00',
        'Blue': '#0000FF',
        'Yellow': '#FFFF00',
        'Magenta': '#FF00FF',
        'Cyan': '#00FFFF',
        'Orange': '#FFA500',
        'Purple': '#800080',
        'Pink': '#FFC0CB',
        'Brown': '#A52A2A',
        'Gray': '#808080',
        'Silver': '#C0C0C0',
        'Gold': '#FFD700',
        'Lavender': '#E6E6FA',
        'Khaki': '#F0E68C',
        'Light Green': '#90EE90',
        'Sky Blue': '#87CEEB',
        'Hot Pink': '#FF69B4',
        'Default': '#FFFFFF'
    };

    const resolveColorDisplay = (colorValue, colorHexValue = '') => {
        // If colorValue is explicitly "Default", return it as-is
        if (typeof colorValue === 'string' && colorValue.trim() === 'Default') {
            return { name: 'Default', hex: '#FFFFFF' };
        }

        const hexCandidate = typeof colorHexValue === 'string' ? colorHexValue.trim() : '';

        if (hexCandidate && hexCandidate.startsWith('#')) {
            const upperHex = hexCandidate.toUpperCase();
            const matchedName = Object.entries(colorNameMap).find(([, hex]) => hex.toUpperCase() === upperHex)?.[0]
                || (typeof colorValue === 'string' && colorValue.trim()) || 'Custom';
            return { name: matchedName, hex: upperHex };
        }

        if (!colorValue) {
            return { name: 'Default', hex: '#FFFFFF' };
        }

        const trimmed = colorValue.trim();

        if (trimmed.startsWith('#')) {
            const upperHex = trimmed.toUpperCase();
            const matchedName = Object.entries(colorNameMap).find(([, hex]) => hex.toUpperCase() === upperHex)?.[0] || 'Custom';
            return { name: matchedName, hex: upperHex };
        }

        const hex = colorNameMap[trimmed] || '#CCCCCC';
        return { name: trimmed, hex };
    };

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/list', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setOrders(data.orders.reverse());
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                border: 'border-amber-200',
                label: 'Pending',
                dot: 'bg-amber-500'
            },
            accepted: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                label: 'Accepted',
                dot: 'bg-blue-500'
            },
            'out-for-delivery': {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-200',
                label: 'Out for Delivery',
                dot: 'bg-purple-500'
            },
            delivered: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                label: 'Delivered',
                dot: 'bg-emerald-500'
            },
            cancelled: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                label: 'Cancelled',
                dot: 'bg-red-500'
            }
        };
        return configs[status] || configs.pending;
    };

    // const filteredOrders = filter === 'all' 
    //     ? orders 
    //     : orders.filter(order => order.status === filter);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-[#FFF5EB] to-[#F6E6D6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-serif text-[#1D1D1E] tracking-tight">
                                My <span className="text-[#D4A574] font-serif">Orders</span>
                            </h1>
                            <div className="mt-2 flex justify-center md:justify-start">
                                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A574] to-[#F6E6D6] rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-4">Track and manage your order history</p>
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="space-y-4">
                            {orders && orders.length > 0 ? (
                                orders.map((order) => {
                                    return (
                                        <div
                                            key={order._id}
                                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                                        >
                                            {/* Order Header */}
                                            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                                                Order #{order._id.slice(-6)}
                                                                
                                                            </h3>
                                                            <p className="text-sm text-gray-500 mt-0.5">
                                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                                                            order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                            order.status === 'accepted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            order.status === 'out-for-delivery' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                            order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            'bg-gray-50 text-gray-700 border-gray-200'
                                                        }`}>
                                                            <span className={`w-2 h-2 rounded-full ${
                                                                order.status === 'pending' ? 'bg-amber-500' :
                                                                order.status === 'accepted' ? 'bg-blue-500' :
                                                                order.status === 'out-for-delivery' ? 'bg-purple-500' :
                                                                order.status === 'delivered' ? 'bg-green-500' :
                                                                'bg-gray-500'
                                                            } animate-pulse`}></span>
                                                            {order.status === 'out-for-delivery' ? 'Out for Delivery' : 
                                                             order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                        <span className="text-xl font-bold text-gray-900">
                                                            {currency}{order.amount.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                {/* Order Items */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                                                        Order Items
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {order.items.map((item, itemIndex) => {
                                                            if (!item.product) {
                                                                return (
                                                                    <div
                                                                        key={itemIndex}
                                                                        className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200"
                                                                    >
                                                                        <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center">
                                                                            <span className="text-red-400 text-xs font-medium">Unavailable</span>
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <p className="font-semibold text-red-700">Product no longer available</p>
                                                                            <p className="text-sm text-red-600 mt-1">This item may have been removed from our catalog</p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="font-semibold text-gray-900">Qty: {item.quantity}</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            return (
                                                                <div
                                                                    key={itemIndex}
                                                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                                >
                                                                    <div className="relative w-20 h-20 flex-shrink-0">
                                                                        <Image
                                                                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                                                                            src={item.product.image?.[0] || assets.box_icon}
                                                                            alt={item.product.name || 'Product'}
                                                                            width={80}
                                                                            height={80}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="font-semibold text-gray-900 truncate">
                                                                            {item.product.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            {item.product.category}
                                                                        </p>
                                                                        {(() => {
                                                                            const resolvedColor = resolveColorDisplay(item.color, item.colorHex);
                                                                            return (
                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                    <span className="text-sm text-gray-600 font-medium">Color:</span>
                                                                                    {resolvedColor.name !== 'Default' && (
                                                                                        <div
                                                                                            className="w-4 h-4 rounded border border-gray-300"
                                                                                            style={{ backgroundColor: resolvedColor.hex }}
                                                                                        ></div>
                                                                                    )}
                                                                                    <span className="text-sm text-gray-600">{resolvedColor.name}</span>
                                                                                </div>
                                                                            );
                                                                        })()}
                                                                        <p className="text-sm text-gray-700 mt-1 font-medium">
                                                                            {currency}{(item.product.offerPrice && item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price).toFixed(2)} each
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-600">Quantity</p>
                                                                        <p className="text-lg font-bold text-gray-900">×{item.quantity}</p>
                                                                        <p className="text-sm text-gray-700 font-semibold mt-1">
                                                                            {currency}{((item.product.offerPrice && item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price) * item.quantity).toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Order Details Grid */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    {/* Delivery Address */}
                                                    <div className="bg-gray-50 p-5 rounded-lg ">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <svg className="w-5 h-5 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <h4 className="font-semibold text-[#1D1D1E]">Delivery Address</h4>
                                                        </div>
                                                        {order.address ? (
                                                            <div className="space-y-1 text-sm">
                                                                <p className="font-semibold text-[#1D1D1E]">{order.address.fullName || 'N/A'}</p>
                                                                <p className="text-gray-700">{order.address.area || 'N/A'}</p>
                                                                <p className="text-gray-700">{order.address.city || 'N/A'}</p>
                                                                <p className="text-gray-600 pt-2 border-t border-gray-300 mt-2">
                                                                    <span className="font-medium">Phone:</span> {order.address.phoneNumber || 'N/A'}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500 italic text-sm">Address information not available</p>
                                                        )}
                                                    </div>

                                                    {/* Order Summary */}
                                                    <div className="bg-gray-50 p-5 rounded-lg ">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <svg className="w-5 h-5 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <h4 className="font-semibold text-[#1D1D1E]">Order Summary</h4>
                                                        </div>
                                                        <div className="space-y-2.5 text-sm">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Total Items</span>
                                                                <span className="font-semibold text-gray-900">{order.items.length}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Payment Method</span>
                                                                <span className="font-semibold text-gray-900">Cash on Delivery</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Order Date</span>
                                                                <span className="font-semibold text-gray-900">
                                                                    {new Date(order.date).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Payment Status</span>
                                                                <span className={`font-semibold ${order.status === 'delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                                    {order.status === 'delivered' ? 'Completed' : 'Pending'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300 mt-3">
                                                                <span className="font-bold text-gray-900">Total Amount</span>
                                                                <span className="text-xl font-bold text-gray-900">
                                                                    {currency}{order.amount.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                    <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                                    <p className="text-gray-500">
                                        Your order history will appear here once you make a purchase
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;