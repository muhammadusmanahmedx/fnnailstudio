"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart, toggleWishlist, isInWishlist } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);

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

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 overflow-x-hidden lg:px-32 pt-14 pb-10 space-y-10 bg-[#FFF5EB] ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <div className="flex gap-4">
                    {/* Vertical Thumbnail Grid */}
                    <div className="flex flex-col gap-3 w-20 md:w-24">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`cursor-pointer  overflow-hidden transition-all duration-300 ${
                                    (mainImage || productData.image[0]) === image 
                                        ? 'ring-2 ring-orange-500 bg-orange-50' 
                                        : 'bg-gray-100 hover:ring-2 hover:ring-orange-300'
                                }`}
                            >
                                <Image
                                    src={image}
                                    alt="thumbnail"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1  overflow-hidden bg-white shadow-lg border-2 border-white">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt={productData.name}
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <h1 className="text-3xl font-medium text-gray-800/90 flex-1">
                            {productData.name}
                        </h1>
                        <button 
                            onClick={() => toggleWishlist(productData)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 border ${
                                isInWishlist(productData._id)
                                    ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' 
                                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-red-500'
                            }`}
                        >
                            <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill={isInWishlist(productData._id) ? "#dc2626" : "none"}
                                stroke={isInWishlist(productData._id) ? "#dc2626" : "currentColor"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className={`text-sm font-medium ${
                                isInWishlist(productData._id) ? 'text-red-600' : 'text-gray-600'
                            }`}>
                                {isInWishlist(productData._id) ? 'In Wishlist' : 'Add to Wishlist'}
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            {/* <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            /> */}
                        </div>
                        <p>(5.0)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        Rs{productData.offerPrice > 0 ? productData.offerPrice : productData.price}
                        {productData.offerPrice > 0 && (
                            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                                Rs{productData.price}
                            </span>
                        )}
                    </p>
                    <div class="w-full mt-4 mb-4 h-[1px] bg-gray-900"></div>

                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">FN Nails Studio</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {productData.category}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Stock</td>
                                    <td className={`font-medium ${productData.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {productData.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </td>
                                </tr>
                              
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4 flex-col">
                        {/* Color Picker Section */}
                        <div className="relative w-full">
                            <p className="text-md text-gray-600 mb-2 text-center ">
                                If no color is selected, the image color will be applied automatically , As Default
                            </p>
                            <button 
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="w-full px-4 py-3 border text-sm transition bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center gap-2"
                            >
                                {selectedColor !== '#000000' ? (
                                    <>
                                        <div 
                                            className="w-4 h-4 rounded border border-gray-300" 
                                            style={{ backgroundColor: selectedColor }}
                                        ></div>
                                        {getColorName(selectedColor)}
                                    </>
                                ) : (
                                    'Custom Color'
                                )}
                            </button>
                            {showColorPicker && (
                                <div 
                                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10"
                                >
                                    <div className="flex flex-col gap-2">
                                        <input 
                                            type="color" 
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            className="w-32 h-10 cursor-pointer"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedColor('#000000')}
                                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 flex-1"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={() => setShowColorPicker(false)}
                                                className="px-3 py-1 bg-[#E8A88F] text-white text-xs rounded hover:bg-[#d49278] flex-1"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 w-full">
                        <button 
                            onClick={() => {
                                if (productData.stock > 0) {
                                    const colorToUse = selectedColor === '#000000' ? '#FFFFFF' : selectedColor;
                                    const colorNameToUse = selectedColor === '#000000' ? 'Default' : getColorName(colorToUse);
                                    
                                    addToCart(productData._id, {
                                        color: colorToUse,
                                        colorName: colorNameToUse,
                                        name: productData.name,
                                        price: productData.offerPrice || productData.price,
                                        image: productData.image[0],
                                        description: productData.description
                                    });
                                }
                            }} 
                            disabled={productData.stock === 0}
                            className={`w-full py-3.5 transition rounded-lg font-semibold ${
                                productData.stock > 0 
                                    ? 'bg-gray-100 text-gray-800/80 hover:bg-gray-200 cursor-pointer' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {productData.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button 
                            onClick={() => { 
                                if (productData.stock > 0) {
                                    const colorToUse = selectedColor === '#000000' ? '#FFFFFF' : selectedColor;
                                    const colorNameToUse = selectedColor === '#000000' ? 'Default' : getColorName(colorToUse);
                                    
                                    addToCart(productData._id, {
                                        color: colorToUse,
                                        colorName: colorNameToUse,
                                        name: productData.name,
                                        price: productData.offerPrice || productData.price,
                                        image: productData.image[0],
                                        description: productData.description
                                    });
                                    router.push('/cart');
                                }
                            }} 
                            disabled={productData.stock === 0}
                            className={`w-full py-3.5 transition rounded-lg font-semibold ${
                                productData.stock > 0 
                                    ? 'bg-[#E8A88F] hover:bg-[#d49278] text-white cursor-pointer' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {productData.stock > 0 ? 'Buy now' : 'Out of Stock'}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-start mb-4 mt-16">
                     <h1 className="text-3xl md:text-4xl font-serif text-[#1D1D1E] tracking-tight">
                Featued <span className="text-[#D4A574] font-serif">Products</span>
              </h1>
              <div className="mt-2 flex justify-center md:justify-start">
                <div className="w-56 h-1 bg-gradient-to-r from-[#D4A574] to-[#F6E6D6] rounded-full"></div>
              </div>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border bg-black hover:bg-black/80 text-white transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;