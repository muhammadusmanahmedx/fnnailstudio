'use client';
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="bg-[#F8EFE8]">
        <Navbar />
        <div className="bg-[#F6E6D6]">
          {/* Hero Section */}
         <div className="min-h-[70vh]">
      {/* Hero Section */}
      <div className="flex items-center min-h-[70vh]">
        {/* Text Content */}
        <div className="w-1/2 pl-36 pr-8">
          <p className="text-sm tracking-widest text-gray-600 mb-4">GET YOUR SHINE ON</p>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Skilled Nail Art
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            At FN Nails Studio, we believe beauty is an art form. Our mission is to elevate your natural elegance through thoughtful designs, premium products, and exceptional service. Every detail is crafted with care, ensuring you leave feeling confident, inspired, and uniquely you.
          </p>
          
          <div className="flex gap-8 mb-8">
            <div>
              <p className="text-4xl font-bold text-gray-900">5K+</p>
              <p className="text-sm text-gray-600 tracking-wide">HAPPY CUSTOMERS</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">8+</p>
              <p className="text-sm text-gray-600 tracking-wide">YEARS OF EXPERIENCE</p>
            </div>
          </div>
          
          <button className="bg-gray-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors">
            SHOP NOW
          </button>
        </div>
        
        {/* Image Content - Right side with gradient */}
        <div className="w-1/2 h-[95vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F6E6D6] z-10"></div>
          <img 
            src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762161654/a3d8bee7-d25c-4a95-a641-7562ea007a46_yufzqf.png" 
            alt="Nail art showcase" 
            className="w-full h-full object-cover  object-left"
          />
        </div>
      </div>
    </div>
        </div>

        {/* Services Section */}
        <div className=" px-6 md:px-16 bg-[#F6E6D6] lg:px-32 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 mb-8 divide-x divide-gray-300">
            {/* Service Cards */}
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/nail1.png"
                  alt="Nail Art Logo"
                  width={30}
                  height={30}
                />
              </div>
              <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">Nail Art</h3>
              <p className="text-gray-600 mb-4">Penatibus in nunc tortor eu. Euismod vehicula sit aliquet viverra molestie.</p>
              {/* <a href="#" className="text-gray-600 hover:text-pink-600 transition">VIEW DETAILS</a> */}
            </div>
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/nail2.png"
                  alt="Manicure Logo"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">Manicure</h3>
              <p className="text-gray-600 mb-4">Ullamcorper vestibulum varius adipiscing eu. Lorem nibh elementum id leo.</p>
              {/* <a href="#" className="text-gray-600 hover:text-pink-600 transition">VIEW DETAILS</a> */}
            </div>
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/nail3.png"
                  alt="Other Services Logo"
                  width={50}
                  height={50}
                />
              </div>
              <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">Other Services</h3>
              <p className="text-gray-600 mb-4">Tincidunt euismod sem eget mauris et interdum neque. Fames sed tortor.</p>
              {/* <a href="#" className="text-gray-600 hover:text-pink-600 transition">VIEW DETAILS</a> */}
            </div>
          </div>
          
        </div>
        


         {/* What We Offer Section */}
        <div className="bg-[#F8EFE8] px-6 md:px-16 lg:px-32 py-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1D1D1E]">What We Offer</h2>
           
          </div>
          <p className="text-lg text-gray-600 mb-12">
            Your trust and loyalty inspire us every day, motivating us to deliver exceptional
             care and memorable experiences with every visit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pedicure Card */}
            <div className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762158993/44985bd9cb38a07e366d00757ff3d198_eltkfv.jpg"
                  alt="Pedicure service"
                  width={400}
                  height={300}
                  className="w-full h-53 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-serif text-[#1D1D1E]">Bridal Designs</h3>
                  <button className="w-10 h-10 border-2 border-[#1D1D1E] flex items-center justify-center hover:bg-[#1D1D1E] hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Nail Art Card */}
            <div className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762159073/screen-shot-2024-01-09-at-9-15-32-am-659d554a0c346_oahpj8.avif"
                  alt="Nail art service"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-serif text-[#1D1D1E]">Modern Art</h3>
                  <button className="w-10 h-10 border-2 border-[#1D1D1E] flex items-center justify-center hover:bg-[#1D1D1E] hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Manicure Card */}
            <div className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762159025/01_w2mbos.webp"
                  alt="Manicure service"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-serif text-[#1D1D1E]">Simple Designs</h3>
                  <button className="w-10 h-10 border-2 border-[#1D1D1E] flex items-center justify-center hover:bg-[#1D1D1E] hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Photo Gallery Section */}
        <div className=" px-6 md:px-16 lg:px-32 py-16">
             <h2 className="text-4xl font-serif mb-4 text-[#1D1D1E]">Photo Gallary </h2>
            
          <p className="text-lg text-gray-600 mb-12">
            Discover a curated collection of stunning nail art designs, each crafted with creativity and elegance. From bold gradients and marble textures to playful geometric patterns
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <Image
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762151422/Gemini_Generated_Image_6olv8n6olv8n6olv_fywmbr.png"
                alt="Manicure service"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
              <Image
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=300&h=290&fit=crop"
                alt="Pedicure service"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
            </div>
            
            {/* Column 2 - Shifted down */}
            <div className="flex flex-col gap-4 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300&h=290&fit=crop"
                alt="Nail art application"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
              <Image
                src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=300&h=290&fit=crop"
                alt="Facial treatment"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
            </div>
            
            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=290&fit=crop"
                alt="Leg massage"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=290&fit=crop"
                alt="Nail polish application"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
            </div>
            
            {/* Column 4 - Shifted down */}
            <div className="flex flex-col gap-4 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=290&fit=crop"
                alt="Natural beauty product"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
              <Image
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=300&h=290&fit=crop"
                alt="Colorful nail polish"
                width={300}
                height={290}
                className="w-full h-auto object-cover "
              />
            </div>
          </div>
          
         
        </div>

 {/* Hero CTA Section */}
        <div className="relative overflow-hidden">
          {/* Background Image with Overlay - Reduced Height */}
          {/* <div className="absolute bg-[] inset-0 h-[450px] bg-[url('https://res.cloudinary.com/dshjm6hcx/image/upload/v1762093955/image_29_ekgckf.png')] bg-cover bg-center opacity-60"></div> */}
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 py-16">
            <div className="text-center mb-12 pt-8">
              <div className="text-[#1d1d1e] text-sm md:text-base font-serif tracking-widest mb-4">GET YOUR SHINE ON</div>
              <h1 className="text-[#1d1d1e] text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight">
                We Care About Your Nail<br />And Your well-Being
              </h1>
            </div>
            
            {/* Image Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
              <div className="overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762149502/471328-tdy-120713-nail-art-combo_mvxqio.webp"
                  alt="Colorful nail art with beads"
                  className="w-full h-[300px] object-cover"
                  width={900}
                  height={600}
                />
              </div>
              <div className="overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762150687/maxresdefault_ntedfh.jpg"
                  alt="Elegant blue and silver nails with ornament"
                  className="w-full h-[300px] object-cover"
                  width={900}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Follow Our Socials Section */}
      <section className="bg-[#F8EFE8] py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8 text-[#1D1D1E]">Follow Our Socials</h2>
          <div className="flex items-center justify-center gap-6">
            {/* Instagram */}
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

            {/* Vertical Divider */}
            <div className="h-12 w-px bg-[#1D1D1E]/20"></div>

            {/* TikTok */}
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
      </section>


        <Footer />
      </div>
    </>
  );
};

export default AboutUs;