import React from 'react';
import Image from 'next/image';

const Receipt = ({ order, currency = 'Rs' }) => {
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

  return (
    <div className="bg-white" style={{ 
      fontFamily: 'Arial, sans-serif',
      width: '210mm',
      minHeight: '297mm',
      padding: '15mm',
      margin: '0 auto',
      boxSizing: 'border-box',
      pageBreakInside: 'avoid', // Prevent content from breaking inside a page
    }}>
      {/* Receipt Icon and Brand Logo */}
      <div className="text-center mb-4 pb-3 border-b-2 border-pink-300" style={{ position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
        <div className="flex justify-center items-center gap-4 mb-2">
          <Image
            src="/fallback.png"
            alt="Brand Logo"
            width={180}
            height={54}
           
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-xs text-gray-600">Thank you for shopping with us!</p>
          
          <p className="text-xs text-gray-600">Visit us at: <a href="https://fnnailstudio.com" className="text-pink-600 underline">fnnailstudio.com</a></p>
        </div>
      </div>

      {/* Paginated Content */}
      <div style={{ pageBreakAfter: 'always' }}>
        {/* Receipt Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-pink-700 mb-1">ORDER RECEIPT</h1>
          <div className="text-xs text-gray-600 flex justify-center items-center gap-8">
            <p className="font-semibold">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
            <p>Order Date: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="font-medium">Order Status: <span className={`uppercase ${order.status === 'pending' ? 'text-yellow-600' : order.status === 'accepted' ? 'text-blue-600' : order.status === 'out-for-delivery' ? 'text-orange-600' : order.status === 'delivered' ? 'text-green-600' : 'text-gray-600'}`}>{order.status === 'out-for-delivery' ? 'Out for Delivery' : order.status}</span></p>
          </div>
        </div>

        {/* Delivery Address */}
        {order.address && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-1 text-sm">Delivery Address:</h3>
            <p className="text-xs text-gray-700">
              <span className="font-semibold">{order.address.fullName || 'N/A'}</span><br />
              {order.address.area || 'N/A'}<br />
              {order.address.city || 'N/A'}<br />
              <span className="text-gray-600">Phone: {order.address.phoneNumber || 'N/A'}</span>
            </p>
          </div>
        )}

        {/* Product List */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 mb-2 text-sm border-b border-gray-300 pb-1">Order Items:</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-1">Product</th>
                <th className="text-left py-1">Color</th>
                <th className="text-center py-1">Qty</th>
                <th className="text-right py-1">Price</th>
                <th className="text-right py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => {
                if (!item.product) {
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td colSpan="5" className="py-2 text-red-600">Product no longer available</td>
                    </tr>
                  );
                }

                const resolvedColor = resolveColorDisplay(item.color, item.colorHex);
                const itemPrice = item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2">
                      <div>
                        <p className="font-medium text-gray-800">{item.product.name}</p>
                        <p className="text-xs text-gray-500">{item.product.category}</p>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        {resolvedColor.name !== 'Default' && (
                          <div
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: resolvedColor.hex }}
                          ></div>
                        )}
                        <span className="text-xs">{resolvedColor.name}</span>
                      </div>
                    </td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">{currency}{itemPrice}</td>
                    <td className="py-2 text-right font-medium">{currency}{itemTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="border-t-2 border-gray-300 pt-2 mb-3">
          <div className="flex justify-end">
            <div className="w-48">
              <div className="flex justify-between py-1 text-xs">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{currency}{order.amount}</span>
              </div>
              <div className="flex justify-between py-1 text-xs">
                <span className="text-gray-600">Delivery Charges:</span>
                <span className="font-medium">{currency}0</span>
              </div>
              {/* <div className="flex justify-between py-1 text-xs border-t border-gray-300">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">{currency}0</span>
              </div> */}
              <div className="flex justify-between py-2 text-sm font-bold border-t-2 border-pink-300">
                <span className="text-pink-700">Total Amount:</span>
                <span className="text-pink-700">{currency}{order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        
         
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Payment Method:</span> Cash on Delivery (COD)
            <span className="font-semibold ml-16">Payment Status:</span> {order.status === 'pending' ? 'Pending' : 'Confirmed'}
          </p>
   

        {/* Thank You Message */}
        <div className=" mt-2 pt-2 text-center border-t-2 border-pink-300 ">
          <h3 className="text-base font-bold text-pink-700 mb-0">We appreciate you and hope you enjoy your purchase</h3>
          {/* <p className="text-xs text-gray-600 mb-0">We appreciate you and hope you enjoy your purchase.</p> */}
          {/* <p className="text-xs text-gray-600">For any queries, please contact our customer support.</p> */}
        
        <div className="text-center text-xs text-gray-500">
         
         <p>This is a computer-generated receipt and does not require a signature.</p>
          <p className="mt-1">© 2025 Won Solutions (wonsol.com). All rights reserved.</p>
        </div>
        </div>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export default Receipt;