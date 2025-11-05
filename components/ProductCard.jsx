import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {

    const { currency, router, toggleWishlist, isInWishlist, addToCart } = useAppContext()
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#000000')

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
    }

    return (
        <div className="bg-[#ffe1d7] border border-[#E8A88F] p-3 sm:p-4 w-full">
            <div
                onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
                className="flex flex-col items-start gap-0.5 w-full cursor-pointer"
            >
                <div className="cursor-pointer group relative w-full h-40 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden">
                    <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        width={800}
                        height={800}
                    />
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200 ${
                            isInWishlist(product._id) 
                                ? 'bg-red-50 hover:bg-red-100' 
                                : 'bg-white hover:bg-gray-50'
                        }`}
                    >
                        {isInWishlist(product._id) ? (
                            <svg 
                                className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        ) : (
                            <svg 
                                className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <p className="text-sm sm:text-base font-medium pt-1.5 sm:pt-2 w-full truncate">{product.name}</p>
                <p className="w-full text-xs text-gray-500/70 hidden sm:block truncate">{product.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-0.5 sm:mt-1 gap-1 sm:gap-0">
                    {/* Price */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {product.offerPrice && product.offerPrice > 0 ? (
                            <>
                                <p className="text-xs sm:text-sm text-gray-500 line-through">
                                    {currency}{product.price}
                                </p>
                                <p className="text-sm sm:text-base font-medium text-black">
                                    {product.offerPrice}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm sm:text-base font-medium text-black">
                                {currency}{product.price}
                            </p>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        <p className="text-xs text-gray-500">5.0</p>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    key={index}
                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-500"
                                    src={assets.star_icon}
                                    alt="star_icon"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2 w-full mt-0.5 sm:mt-1">
                    <div className="relative">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowColorPicker(!showColorPicker);
                            }}
                            className="mt-1.5 sm:mt-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 border text-xs sm:text-sm transition bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
                        >
                            {selectedColor !== '#000000' ? (
                                <>
                                    <div 
                                        className="w-3 h-3 sm:w-4 sm:h-4 rounded border border-gray-300" 
                                        style={{ backgroundColor: selectedColor }}
                                    ></div>
                                    <span className="truncate">{getColorName(selectedColor)}</span>
                                </>
                            ) : (
                                'Custom Color'
                            )}
                        </button>
                        {showColorPicker && (
                            <div 
                                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 sm:p-3 z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="color" 
                                        value={selectedColor}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                        className="w-24 h-8 sm:w-32 sm:h-10 cursor-pointer"
                                    />
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedColor('#000000');
                                            }}
                                            className="px-2 sm:px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 flex-1"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowColorPicker(false);
                                            }}
                                            className="px-2 sm:px-3 py-1 bg-[#E8A88F] text-white text-xs rounded hover:bg-[#d49278] flex-1"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (product.stock > 0) {
                                const colorToUse = selectedColor === '#000000' ? '#FFFFFF' : selectedColor;
                                const colorNameToUse = selectedColor === '#000000' ? 'Default' : getColorName(colorToUse);
                                
                                addToCart(product._id, {
                                    color: colorToUse,
                                    colorName: colorNameToUse,
                                    name: product.name,
                                    price: product.offerPrice || product.price,
                                    image: product.image[0],
                                    description: product.description
                                });
                            }
                        }}
                        disabled={product.stock === 0}
                        className={`mt-1.5 sm:mt-2 w-full px-3 sm:px-4 py-1.5 sm:py-2 border text-xs sm:text-sm transition flex items-center justify-center gap-1.5 sm:gap-2 ${
                            product.stock > 0 
                                ? 'text-white bg-[#E8A88F] hover:bg-[#d49278] cursor-pointer' 
                                : 'text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100'
                        }`}
                    >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard