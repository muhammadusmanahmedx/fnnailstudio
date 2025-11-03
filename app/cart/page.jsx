'use client'
import React, { useState, useRef, useCallback } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [tempColors, setTempColors] = useState({});
  const colorUpdateTimeoutRef = useRef({});

  // Debounced color update function
  const debouncedColorUpdate = useCallback((cartKey, quantity, color, colorName) => {
    // Clear existing timeout for this product
    if (colorUpdateTimeoutRef.current[cartKey]) {
      clearTimeout(colorUpdateTimeoutRef.current[cartKey]);
    }
    
    // Set new timeout
    colorUpdateTimeoutRef.current[cartKey] = setTimeout(() => {
      updateCartQuantity(cartKey, quantity, { color, colorName });
      delete colorUpdateTimeoutRef.current[cartKey];
      // Clear temp color after update
      setTempColors(prev => {
        const newTempColors = { ...prev };
        delete newTempColors[cartKey];
        return newTempColors;
      });
    }, 800); // Wait 800ms after user stops adjusting color
  }, [updateCartQuantity]);

  // Function to convert hex color to nearest color name
  const getColorName = (hex) => {
    const colors = {
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta',
      '#00FFFF': 'Cyan',
      '#FFA500': 'Orange',
      '#800080': 'Purple',
      '#FFC0CB': 'Pink',
      '#A52A2A': 'Brown',
      '#808080': 'Gray',
      '#C0C0C0': 'Silver',
      '#FFD700': 'Gold',
      '#E6E6FA': 'Lavender',
      '#F0E68C': 'Khaki',
      '#90EE90': 'Light Green',
      '#87CEEB': 'Sky Blue',
      '#FF69B4': 'Hot Pink',
    };

    // Convert hex to RGB
    const hexToRgb = (h) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb = hexToRgb(hex);
    if (!rgb) return 'Custom';

    // Find nearest color
    let minDistance = Infinity;
    let nearestColor = 'Custom';

    Object.entries(colors).forEach(([colorHex, colorName]) => {
      const colorRgb = hexToRgb(colorHex);
      if (colorRgb) {
        const distance = Math.sqrt(
          Math.pow(rgb.r - colorRgb.r, 2) +
          Math.pow(rgb.g - colorRgb.g, 2) +
          Math.pow(rgb.b - colorRgb.b, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestColor = colorName;
        }
      }
    });

    return nearestColor;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 pb-10 bg-gradient-to-b from-[#FFF5EB] to-[#F6E6D6] min-h-screen">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 pb-6">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-serif text-[#1D1D1E] tracking-tight">
                Your <span className="text-[#D4A574] font-serif">Cart</span>
              </h1>
              <div className="mt-2 flex justify-center md:justify-start">
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A574] to-[#F6E6D6] rounded-full"></div>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 font-medium">{getCartCount()} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Color
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((cartKey) => {
                  const cartItem = cartItems[cartKey];
                  
                  // Extract product ID from composite key (format: productId_color)
                  const productId = cartItem?.productId || cartKey.split('_')[0];
                  const product = products.find(product => product._id === productId);
                  
                  // Handle both old format (number) and new format (object)
                  const quantity = typeof cartItem === 'number' ? cartItem : cartItem?.quantity || 0;
                  const itemColor = tempColors[cartKey]?.color || (typeof cartItem === 'object' ? cartItem?.color : '#FFFFFF');
                  const itemColorName = tempColors[cartKey]?.colorName || (typeof cartItem === 'object' ? cartItem?.colorName : null);

                  if (!product || quantity <= 0) return null;

                  return (
                    <tr key={cartKey}>
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="rounded-lg overflow-hidden bg-[#FFF5EB] p-2">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-red-600 mt-1 hover:text-red-800 font-medium"
                            onClick={() => updateCartQuantity(cartKey, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-[#1D1D1E]">{product.name}</p>
                          <button
                            className="text-xs text-red-600 mt-1 hover:text-red-800 font-medium"
                            onClick={() => updateCartQuantity(cartKey, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-[#1D1D1E]">
                        Rs{product.offerPrice !== undefined && product.offerPrice !== null && product.offerPrice > 0 ? product.offerPrice : product.price}
                      </td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          <button onClick={() => updateCartQuantity(cartKey, quantity - 1)}>
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                          <input onChange={e => updateCartQuantity(cartKey, Number(e.target.value))} type="number" value={quantity} className="w-8 border text-center appearance-none"></input>
                          <button onClick={() => updateCartQuantity(cartKey, quantity + 1, { color: itemColor })}>
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        <div className="relative">
                          <button 
                            onClick={() => setShowColorPicker(showColorPicker === cartKey ? null : cartKey)}
                            className="px-3 py-1 border text-xs transition bg-[#FFF5EB] hover:bg-[#F6E6D6] cursor-pointer flex items-center gap-2"
                          >
                            <div 
                              className="w-4 h-4 rounded border border-gray-300" 
                              style={{ backgroundColor: itemColor }}
                            ></div>
                            {itemColorName || getColorName(itemColor) || 'Default'}
                          </button>
                          {showColorPicker === cartKey && (
                            <div 
                              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10"
                            >
                              <div className="flex flex-col gap-2">
                                <input 
                                  type="color" 
                                  value={itemColor}
                                  onChange={(e) => {
                                    const newColor = e.target.value;
                                    const newColorName = getColorName(newColor);
                                    // Store color temporarily for immediate UI update only
                                    setTempColors(prev => ({
                                      ...prev,
                                      [cartKey]: { color: newColor, colorName: newColorName }
                                    }));
                                  }}
                                  className="w-32 h-10 cursor-pointer"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Reset to default color and update immediately
                                    setTempColors(prev => ({
                                      ...prev,
                                      [cartKey]: { color: '#FFFFFF', colorName: 'Default' }
                                    }));
                                    updateCartQuantity(cartKey, quantity, { color: '#FFFFFF', colorName: 'Default' });
                                    setShowColorPicker(null);
                                  }}
                                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                                >
                                  Reset to Default
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Save the color change when Done is clicked
                                    const currentColor = tempColors[cartKey]?.color || itemColor;
                                    const currentColorName = tempColors[cartKey]?.colorName || getColorName(currentColor);
                                    
                                    // Cancel any pending debounced updates
                                    if (colorUpdateTimeoutRef.current[cartKey]) {
                                      clearTimeout(colorUpdateTimeoutRef.current[cartKey]);
                                      delete colorUpdateTimeoutRef.current[cartKey];
                                    }
                                    
                                    // Update cart with final color and color name
                                    updateCartQuantity(cartKey, quantity, { color: currentColor, colorName: currentColorName });
                                    
                                    // Clear temp colors
                                    setTempColors(prev => {
                                      const newTempColors = { ...prev };
                                      delete newTempColors[cartKey];
                                      return newTempColors;
                                    });
                                    
                                    setShowColorPicker(null);
                                  }}
                                  className="px-3 py-1 bg-[#D4A574] text-white text-xs rounded hover:bg-[#F6E6D6]"
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-[#1D1D1E]">
                        Rs{((product.offerPrice !== undefined && product.offerPrice !== null && product.offerPrice > 0 ? product.offerPrice : product.price) * quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={() => router.push('/all-products')} className="group flex items-center mt-6 gap-2 text-[#1D1D1E] hover:text-gray-600">
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
