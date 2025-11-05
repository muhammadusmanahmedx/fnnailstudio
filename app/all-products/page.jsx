'use client'
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Followsocials from "@/components/Followsocials";

const AllProducts = () => {

    const { products, categories } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filter products based on selected category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <>
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="h-full bg-gradient-to-b from-[#FFF5EB] to-[#F6E6D6] ">
                {/* Header Section */}
                <div className="px-6 md:px-16 lg:px-32 pt-16 pb-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="max-w-4xl">
                            <h1 className="text-3xl md:text-4xl font-serif text-[#1D1D1E] tracking-tight">
                                All <span className="text-[#D4A574] font-serif">Products</span>
                            </h1>
                            <div className="mt-2 flex justify-center md:justify-start">
                                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A574] to-[#F6E6D6] rounded-full"></div>
                            </div>
                            <p className="text-gray-600 text-lg mt-3">
                                Explore our carefully curated collection of premium items, each crafted with precision and designed to elevate your experience.
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-col gap-2 md:min-w-[280px]">
                            <label className="text-sm font-medium text-gray-700">
                                Filter by Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 bg-white border-2 border-[#F6E6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all duration-200 text-sm font-medium text-gray-700 hover:border-[#D4A574] cursor-pointer shadow-sm"
                            >
                                <option value="All">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name} ({category.products})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Count Badge */}
                <div className="px-6 md:px-16 lg:px-32 pb-8">
                    <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm rounded-full px-5 py-2.5 shadow-sm border border-[#F6E6D6]">
                        <span className="text-sm font-medium text-gray-700">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                        </span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="px-6 md:px-16 lg:px-32 pb-20">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-[#D4A574]">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-600 text-lg font-medium mb-2">No products found</p>
                            <p className="text-gray-500 text-sm">Try selecting a different category</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Follow Our Socials Section */}
            {/* <section className="bg-[#F6E6D6] py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif mb-8 text-[#1D1D1E]">Follow Our Socials</h2>
                    <div className="flex items-center justify-center gap-6">
                        <a 
                            href="https://instagram.com/fnnailstudio" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-80 transition"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span className="text-lg font-medium text-[#1D1D1E]">@fnnailstudio</span>
                        </a>
                        <div className="h-12 w-px bg-[#1D1D1E]/20"></div>
                        <a 
                            href="https://tiktok.com/@fnnailstudio" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-80 transition"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                            </svg>
                            <span className="text-lg font-medium text-[#1D1D1E]">@fnnailstudio</span>
                        </a>
                    </div>
                </div>
            </section> */}

<Followsocials/>

            <Footer />
            </div>
        </>
    );
};

export default AllProducts;