'use client';
import React, { useEffect, useState, useRef } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import Receipt from "@/components/Receipt";
import axios from "axios";
import toast from "react-hot-toast";
import { useReactToPrint } from 'react-to-print';

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState({});
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState(null);
    const receiptRef = useRef();

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

    const statusFilters = [
        { key: 'all', label: 'All Orders', color: 'text-gray-600' },
        { key: 'pending', label: 'Pending', color: 'text-yellow-600' },
        { key: 'accepted', label: 'Accepted', color: 'text-blue-600' },
        { key: 'out-for-delivery', label: 'Out for Delivery', color: 'text-orange-600' },
        { key: 'delivered', label: 'Delivered', color: 'text-green-600' }
    ];

    const filteredOrders = activeFilter === 'all' 
        ? orders 
        : orders.filter(order => order.status === activeFilter);

    const getOrderCount = (status) => {
        if (status === 'all') return orders.length;
        return orders.filter(order => order.status === status).length;
    };

    const fetchSellerOrders = async () => {
        const token = await getToken();
        try {
            const { data } = await axios.get('/api/order/seller-order', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setOrders(data.orders.reverse());
                setLoading(false);
            } else {
                toast.error(data.message);
                // Use dummy data as fallback
                console.log('API failed, using dummy data:', data.message);
                setOrders(orderDummyData);
                setLoading(false);
            }
        }
        catch (error) {
            console.error('API error, using dummy data:', error);
            toast.error('Unable to load orders - using sample data');
            // Use dummy data as fallback and stop loading
            setOrders(orderDummyData);
            setLoading(false);
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdatingStatus(prev => ({ ...prev, [orderId]: true }));
        const token = await getToken();
        try {
            const { data } = await axios.patch('/api/order/update-status', {
                orderId,
                status: newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (data.success) {
                // Update the order status in the local state
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                toast.success('Order status updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [orderId]: false }));
        }
    }

    useEffect(() => {
        if (user){
            fetchSellerOrders();
        }
    }, [user]);

    const handlePrintReceipt = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: `Receipt-${selectedOrderForReceipt?._id.slice(-8).toUpperCase()}`,
        onAfterPrint: () => {
            toast.success('Receipt printed successfully!');
            setSelectedOrderForReceipt(null);
        }
    });

    const generateReceipt = (order) => {
        setSelectedOrderForReceipt(order);
        setTimeout(() => {
            handlePrintReceipt();
        }, 100);
    };

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="lg:p-10 md:p-6 p-3 space-y-4 md:space-y-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Orders Management</h2>
                    <div className="text-xs md:text-sm text-gray-500">
                        Total: {orders.length} orders
                    </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="bg-white rounded-lg p-1 shadow-sm border">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-2 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-200 flex items-center gap-1 md:gap-2 min-w-0 ${
                                    activeFilter === filter.key
                                        ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="truncate">{filter.label}</span>
                                <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-bold ${
                                    activeFilter === filter.key
                                        ? 'bg-orange-200 text-orange-800'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {getOrderCount(filter.key)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Display */}
                <div className="w-full max-w-none">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-8 md:py-12 bg-white rounded-lg border">
                            <div className="text-gray-400 text-lg mb-2">📦</div>
                            <p className="text-gray-500 font-medium text-sm md:text-base">
                                {activeFilter === 'all' ? 'No orders found' : `No ${activeFilter} orders`}
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div key={index} className={`flex flex-col gap-3 md:gap-5 p-3 md:p-6 mb-4 md:mb-6 rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md ${
                                order.status === 'pending' ? 'bg-yellow-50 border-yellow-400' :
                                order.status === 'accepted' ? 'bg-blue-50 border-blue-400' :
                                order.status === 'out-for-delivery' ? 'bg-orange-50 border-orange-400' :
                                order.status === 'delivered' ? 'bg-green-50 border-green-400' :
                                'bg-white border-gray-300'
                            }`}>
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3 md:pb-4 gap-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-800">Order #{order._id.slice(-6)}</h3>
                                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide self-start ${
                                            order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                            order.status === 'accepted' ? 'bg-blue-200 text-blue-800' :
                                            order.status === 'out-for-delivery' ? 'bg-orange-200 text-orange-800' :
                                            order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                                            'bg-gray-200 text-gray-800'
                                        }`}>
                                            {order.status === 'out-for-delivery' ? 'Out for Delivery' : order.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                                        <div className="text-left md:text-right">
                                            <p className="text-xs md:text-sm text-gray-500">Order Date</p>
                                            <p className="font-medium text-sm md:text-base">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-xs md:text-sm text-gray-500">Total Amount</p>
                                            <p className="text-lg md:text-2xl font-bold text-gray-800">{currency}{order.amount}</p>
                                        </div>
                                    </div>
                                </div>                            {/* Order Items */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-800">Order Items:</h4>
                                {order.items.map((item, itemIndex) => {
                                    // Check if product exists
                                    if (!item.product) {
                                        return (
                                            <div key={itemIndex} className="flex items-center gap-4 p-3 bg-red-50 rounded border border-red-200">
                                                <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs">N/A</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-red-600">Product no longer available</p>
                                                    <p className="text-sm text-gray-600">This product may have been removed</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">Qty: {item.quantity}</p>
                                                    <p className="text-sm text-gray-600">Price: N/A</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    
                                    return (
                                        <div key={itemIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                                            <Image
                                                className="w-16 h-16 object-cover rounded border"
                                                src={item.product.image?.[0] || assets.box_icon}
                                                alt={item.product.name || 'Product'}
                                                width={64}
                                                height={64}
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-sm text-gray-600">Category: {item.product.category}</p>
                                                {(() => {
                                                    const resolvedColor = resolveColorDisplay(item.color, item.colorHex);
                                                    return (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <span className="font-medium">Color:</span>
                                                            {resolvedColor.name !== 'Default' && (
                                                                <div
                                                                    className="w-4 h-4 rounded border border-gray-300"
                                                                    style={{ backgroundColor: resolvedColor.hex }}
                                                                ></div>
                                                            )}
                                                            <span>{resolvedColor.name}</span>
                                                        </div>
                                                    );
                                                })()}
                                                <p className="text-sm text-gray-600">Price: {currency}{item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">Qty: {item.quantity}</p>
                                                <p className="text-sm text-gray-600">
                                                    Total: {currency}{(item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price) * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Customer Details and Status */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
                                {/* Customer Address */}
                                <div className="bg-gray-50 p-3 md:p-4 rounded">
                                    <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Delivery Address:</h4>
                                    {order.address ? (
                                        <p className="text-sm md:text-base">
                                            <span className="font-medium">{order.address.fullName || 'N/A'}</span>
                                            <br />
                                            <span>{order.address.area || 'N/A'}</span>
                                            <br />
                                            <span>{order.address.city || 'N/A'}</span>
                                            <br />
                                            <span className="text-xs md:text-sm text-gray-600">Phone: {order.address.phoneNumber || 'N/A'}</span>
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 italic text-sm">Address information not available</p>
                                    )}
                                </div>
                                
                                {/* Order Info */}
                                <div className="bg-gray-50 p-3 md:p-4 rounded">
                                    <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Order Info:</h4>
                                    <p className="space-y-1 text-sm md:text-base">
                                        <span className="block">Items: {order.items.length}</span>
                                        <span className="block">Method: COD</span>
                                        <span className="block">Payment: {order.status === 'pending' ? 'Pending' : 'Confirmed'}</span>
                                    </p>
                                </div>
                                
                                {/* Status Management */}
                                <div className="bg-gray-50 p-3 md:p-4 rounded">
                                    <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">Order Status:</h4>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        disabled={updatingStatus[order._id]}
                                        className={`w-full p-2 border rounded text-xs md:text-sm font-medium ${
                                            order.status === 'pending' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                                            order.status === 'accepted' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                                            order.status === 'out-for-delivery' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                                            'text-green-600 bg-green-50 border-green-200'
                                        } disabled:opacity-50`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="out-for-delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                    {updatingStatus[order._id] && (
                                        <p className="text-xs text-gray-500 mt-1">Updating...</p>
                                    )}
                                </div>
                            </div>

                            {/* Receipt Button */}
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => generateReceipt(order)}
                                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Generate Receipt
                                </button>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>}

            {/* Hidden Receipt Component for Printing */}
            <div style={{ display: 'none' }}>
                {selectedOrderForReceipt && (
                    <div ref={receiptRef}>
                        <Receipt order={selectedOrderForReceipt} currency={currency} />
                    </div>
                )}
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default Orders;