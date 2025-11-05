'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagesTextSection from "@/components/imagestextsection";
import Followsocials from "@/components/Followsocials";
// import quotesIcon from "@/assets/quotes.png";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
 <div className="relative h-[75vh] sm:h-[85vh] bg-gradient-to-b from-[#FFF5EB] to-[#F6E6D6] overflow-hidden">
        <div className="relative z-10 flex flex-col items-start justify-start h-full text-left px-4 sm:px-8 md:px-16 lg:px-32 max-w-full pt-16 sm:pt-20 md:pt-24">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl lg:mt-16 font-serif mb-2 sm:mb-4 text-[#1D1D1E] leading-tight max-w-xl">
            Make Your Nails Look Gorgeous!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#1D1D1E]/40 mb-3 sm:mb-4 max-w-xl">
            Transform your nails into stunning works of art with our expert <br className="hidden sm:block"/>nail services and sophisticated manicure.
          </p>
          <button 
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#1D1D1E] text-white text-sm sm:text-base hover:bg-gray-800 transition" 
          >
            ABOUT US
          </button>
        </div>
        <div className="absolute bottom-0 mt-12 right-0 h-4/5 sm:h-[95%] md:h-[95%] w-full sm:w-2/3 md:w-1/2 pointer-events-none">
          <img 
            src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762310838/Hero_Section_2_1_oti89g.png" 
            alt="Hero Section" 
            className="h-full w-full object-contain object-bottom sm:object-right" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-[#F8EFE8]"></div>
        </div>
      </div>

<div className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 bg-[#F8EFE8]">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-[#1D1D1E]">
    Unleashing Creativity: A Nail Art Haven
  </h2>

  <p className="text-sm sm:text-base md:text-lg text-[#1D1D1E]/60 mb-8 sm:mb-12 max-w-4xl">
    Enter our vibrant and inspiring space, designed to your imagination and awaken your artistic spirit.
    Feel the energy and passion that radiates from our skilled nail artists, who are dedicated to
    turning your nail dreams into reality.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">

    {/* 1️⃣ 1st Image → Taller on mobile */}
    <img
      src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762094523/image_28_skdlxa.png"
      alt="Nail Art 1"
      className="w-full h-full sm:h-80 md:h-96 object-cover rounded-lg"
    />

    {/* 2️⃣ 2nd Image → Normal behavior */}
    <img
      src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762093955/image_29_ekgckf.png"
      alt="Nail Art 2"
      className="w-full h-64 sm:h-80 md:h-auto object-cover rounded-lg"
    />

    {/* 3️⃣ 3rd Image → Taller on mobile */}
    <img
      src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762095330/image_30_cgpauu.png"
      alt="Nail Art 3"
      className="w-full h-96 sm:h-80 md:h-96 object-cover rounded-lg sm:col-span-2 md:col-span-1"
    />

  </div>
</div>



      {/* Why Choose Us Section */}
      <section className="bg-[#F8EFE8] py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-start">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-[#1D1D1E]">Why Choose Us</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-12">
            At GlamNails, we understand that when it comes to nail art, you have many options to choose from.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2 boxes */}
            <div className="space-y-6">
              {/* Years of Experience Card */}
              <div className="bg-[#F6E6D6] w-full max-w-[400px] h-auto min-h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
                <p className="text-base text-gray-600 mb-2">Decades of expertise in nail artistry.</p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
                  <li>Over a decade in the nail art industry</li>
                  <li>Expertise in modern and classic designs</li>
                  <li>Highly skilled and certified professionals</li>
                  <li>Commitment to precision and creativity</li>
                </ul>
              </div>

              {/* Experienced Staff Card */}
              <div className="bg-[#F6E6D6] w-full max-w-[400px] h-auto min-h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Experienced Staff</h3>
                <p className="text-base text-gray-600 mb-2">Dedicated professionals for nail care.</p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
                  <li>Certified nail technicians</li>
                  <li>Specialized in intricate nail designs</li>
                  <li>Friendly and professional service</li>
                  <li>Continuous training in latest trends</li>
                </ul>
              </div>
            </div>

            {/* Center Column - Adjusted content and image alignment */}
            <div>
              <div className="bg-[#F6E6D6] w-full max-w-[400px] h-auto min-h-[668px] rounded-lg flex flex-col items-center mx-auto overflow-hidden">
                <div className="text-center p-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Let's Buy Now!</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Book your appointment with GlamNails and join us on a journey of exquisite nail artistry. Experience the best in nail care and design.
                  </p>
                  <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition">
                    Shop Now
                  </button>
                </div>
                <img
                  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762096031/image_31_ofyyse.png"
                  alt="Let's Book Now"
                  className="w-full h-auto mt-auto"
                />
              </div>
            </div>

            {/* Right Column - 2 boxes */}
            <div className="space-y-6">
              {/* Best Quality Card */}
              <div className="bg-[#F6E6D6] w-full max-w-[400px] h-auto min-h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
                <p className="text-base text-gray-600 mb-2">Unmatched quality in every service.</p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
                  <li>Premium products and tools</li>
                  <li>Attention to detail in every design</li>
                  <li>Long-lasting and durable nail art</li>
                  <li>Customer satisfaction guaranteed</li>
                </ul>
              </div>

              {/* Trend Awareness Card */}
              <div className="bg-[#F6E6D6] w-full max-w-[400px] h-auto min-h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trend Awareness</h3>
                <p className="text-base text-gray-600 mb-2">Stay ahead with the latest trends.</p>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-600">
                  <li>Latest nail art techniques</li>
                  <li>Innovative and creative designs</li>
                  <li>Seasonal and event-based themes</li>
                  <li>Inspiration from global trends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 bg-[#F8EFE8] md:px-16 lg:px-32">
        {/* <ImagesTextSection /> */}
        <HomeProducts />
      </div>

      
      {/* Special Offers Section */}
      <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-16 bg-[#F8EFE8]">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4 pt-12 text-[#1D1D1E]">Uniqueness & Artistry</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-12">
           Where every design is thoughtfully handcrafted, blending creativity and precision to reflect 
           your individuality and elevate your natural beauty.
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Card */}
          <div className="relative bg-[#F6E6D6] rounded-lg overflow-hidden flex flex-col sm:flex-row items-center min-h-[280px]">
            <div className="w-full sm:w-1/2">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762118631/image_37_rrfhzb.png" 
                alt="Unique Colour of Nail Polish" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 sm:pl-8 text-left font-serif">
              <p className="text-gray-600 text-sm mb-2">Save Upto <span className="font-bold text-black">50%</span> Off</p>
              <h3 className="text-2xl sm:text-3xl font-medium text-black mb-6 leading-tight">Unique Colour<br />of Nail Polish</h3>
              <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition uppercase text-sm font-medium">
                Shop Now
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="relative bg-[#F6E6D6] rounded-lg overflow-hidden flex flex-col sm:flex-row items-center min-h-[280px]">
            <div className="w-full sm:w-1/2 h-full">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762118653/image_36_nuvp8g.png" 
                alt="New Nail Art Design Look" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 sm:pl-8 text-left font-serif">
              <p className="text-gray-600 text-sm mb-2">New Makeup Look</p>
              <h3 className="text-2xl sm:text-3xl font-medium text-black mb-6 leading-tight">New Nail Art<br />Design Look</h3>
              <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition uppercase text-sm font-medium">
              Explore 
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* <FeaturedProduct /> */}
        {/* <Banner /> */}
        {/* <NewsLetter /> */}
  
      {/* Testimonial Section */}
    <section className="bg-[#F8EFE8] py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-start">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-[#1D1D1E]">Our Valuable Customer</h2>
            
          <p className="text-base sm:text-lg text-gray-600 mb-12">
            Your trust and loyalty inspire us every day, motivating us to deliver exceptional
             care and memorable experiences with every visit.
          </p>
          <div className="space-y-8">
            {/* Testimonial 1 */}
            <div className="bg-[#F6E6D6] p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start relative">
             <img 
  src="https://res.cloudinary.com/dshjm6hcx/image/upload_v1762119731/Image_tofgtm.png"
  alt="Customer 1" 
  className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
/>
              <div className="text-left flex-1">
                <p className="text-base sm:text-lg text-[#1D1D1E]/60 mb-4">"The salon itself has a warm and inviting atmosphere, creating a relaxing environment as soon as you walk through the door. The staff greeted me with a friendly smile and made me feel instantly comfortable. The nail technician who worked on my nails was incredibly talented. They took the time to listen to my preferences."</p>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1E]">Mary M. Seidel</h3>
                <p className="text-sm text-[#1D1D1E]/40">Los Angel, CA</p>
              </div>
              <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#F6E6D6] p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start relative">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload_v1762119742/Image_1_wil6py.png" 
                alt="Customer 2" 
                className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
              />
              <div className="text-left flex-1">
                <p className="text-base sm:text-lg text-[#1D1D1E]/60 mb-4">"The final result of my manicure was absolutely stunning. The technician skillfully applied the polish, leaving my nails with a flawless and glossy finish. I received numerous compliments on my nails, and I couldn't help but show them off proudly. The final result of my manicure was absolutely stunning."</p>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1E]">Kathy R. Crockett</h3>
                <p className="text-sm text-[#1D1D1E]/40">Manager, Office</p>
              </div>
              <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#F6E6D6] p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start relative">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload_v1762119747/Image_2_qqblcg.png" 
                alt="Customer 3" 
                className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"
              />
              <div className="text-left flex-1">
                <p className="text-base sm:text-lg text-[#1D1D1E]/60 mb-4">"Overall, my experience at GlamNails was outstanding. The professionalism, skill, the selection of nail products, colors was extensive and attention to detail demonstrated by the staff truly sets this salon apart. I left feeling pampered and confident with my beautiful nails."</p>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1E]">Belinda W. Scott</h3>
                <p className="text-sm text-[#1D1D1E]/40">Student</p>
              </div>
             <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-12 w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </div>
        </div>
      </section>

<Followsocials/>


      <Footer />
    </div>
  );
};

export default Home;