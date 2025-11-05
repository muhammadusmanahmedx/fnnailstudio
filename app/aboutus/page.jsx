'use client';
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Followsocials from "@/components/Followsocials";

const AboutUs = () => {
  return (
    <>
      <div className="overflow-x-hidden bg-gradient-to-b from-[#FFF5EB] to-[#F6E6D6]">
        <Navbar />
        <div className="">
          {/* Hero Section */}
          <div className="min-h-[70vh]">
            {/* Hero Section */}
             <div className="min-h-screen lg:min-h-[70vh]">
        <div className="flex flex-col lg:flex-row items-center min-h-screen lg:min-h-[70vh]">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 lg:pl-36 lg:pr-8 py-12 lg:py-0">
            <p className="text-xs sm:text-sm tracking-widest text-gray-600 mb-4">GET YOUR SHINE ON</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
              Skilled Nail Art
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
              At FN Nails Studio, we believe beauty is an art form. Our mission is to elevate your natural elegance through thoughtful designs, premium products, and exceptional service. Every detail is crafted with care, ensuring you leave feeling confident, inspired, and uniquely you.
            </p>

            <div className="flex gap-6 sm:gap-8 mb-8">
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-gray-900">5K+</p>
                <p className="text-xs sm:text-sm text-gray-600 tracking-wide">HAPPY CUSTOMERS</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-serif text-gray-900">8+</p>
                <p className="text-xs sm:text-sm text-gray-600 tracking-wide">YEARS OF EXPERIENCE</p>
              </div>
            </div>

            <button className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wider hover:bg-gray-800 transition-colors w-full sm:w-auto">
              SHOP NOW
            </button>
          </div>

          {/* Image Content */}
         <div className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[94vh] relative overflow-hidden">
  
  {/* 3-point gradient */}
  <div className="absolute inset-0 bg-gradient-to-b 
      from-[#FFF5EB] from-1%
      via-transparent via-98%
      to-[#FFF5EB] to-100%
      z-10">
  </div>

  <img
    src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762161654/a3d8bee7-d25c-4a95-a641-7562ea007a46_yufzqf.png"
    alt="Nail art showcase"
    className="w-full h-full object-cover object-left"
  />
</div>

        </div>
      </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-6 md:px-16 lg:px-32 py-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 mb-8 md:divide-x md:divide-gray-300">
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
      <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">
        Nail Art
      </h3>
      <p className="text-gray-600 mb-4">
        Penatibus in nunc tortor eu. Euismod vehicula sit aliquet viverra molestie.
      </p>
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
      <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">
        Manicure
      </h3>
      <p className="text-gray-600 mb-4">
        Ullamcorper vestibulum varius adipiscing eu. Lorem nibh elementum id leo.
      </p>
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
      <h3 className="text-[#1D1D1E] text-xl font-serif font-bold mb-2">
        Other Services
      </h3>
      <p className="text-gray-600 mb-4">
        Tincidunt euismod sem eget mauris et interdum neque. Fames sed tortor.
      </p>
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
        <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 lg:px-32 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
            <div className="text-[#1d1d1e] text-xs sm:text-sm md:text-base font-serif tracking-widest mb-4">GET YOUR SHINE ON</div>
            <h1 className="text-[#1d1d1e] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight">
              We Care About Your Nail<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>And Your well-Being
            </h1>
          </div>

          {/* Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl w-full">
            <div className="overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762149502/471328-tdy-120713-nail-art-combo_mvxqio.webp"
                alt="Colorful nail art with beads"
                className="w-full h-48 sm:h-64 md:h-[300px] object-cover"
              />
            </div>
            <div className="overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762150687/maxresdefault_ntedfh.jpg"
                alt="Elegant blue and silver nails with ornament"
                className="w-full h-48 sm:h-64 md:h-[300px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Follow Our Socials Section */}
       <Followsocials/>

        <Footer />
      </div>
      </div>
    </>
  );
};

export default AboutUs;