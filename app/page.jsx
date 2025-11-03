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
// import quotesIcon from "@/assets/quotes.png";

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="relative h-screen bg-cover bg-fit" style={{ backgroundImage: "url('https://res.cloudinary.com/dshjm6hcx/image/upload/v1762092004/Hero_Section_bsxjhm.png')" }}>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-6  md:px-16 lg:px-32">
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-[#1D1D1E] leading-tight">Make Your Nails<br /> Look Gorgeous!</h1>
          <p className="text-lg md:text-xl max-w-2xl text-[#1D1D1E]/40 mb-6">Transform your nails into stunning works of art with our expert <br/>nail services and sophisticated manicure.</p>
          <button className="mt-8 px-6 py-3 bg-[#1D1D1E] text-white hover:bg-gray-800 transition" onClick={() => router.push('/aboutus')}>ABOUT US</button>
        </div>
      </div>


    <div className="px-6 md:px-16 lg:px-32 py-16 bg-[#F8EFE8]">
        <h2 className="text-4xl font-serif mb-6 text-[#1D1D1E]">Unleashing Creativity: A Nail Art Haven</h2>
        <p className="text-lg text-[#1D1D1E]/60 mb-12">Enter our vibrant and inspiring space, designed to your imagination and awaken your artistic spirit. Feel the energy and passion that radiates from our skilled nail artists, who are dedicated to turning your nail dreams into reality.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <img src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762094523/image_28_skdlxa.png" alt="Nail Art 1" className="w-full h-96 object-cover rounded-lg" />
          <img src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762093955/image_29_ekgckf.png" alt="Nail Art 2" className="w-full h-auto object-cover rounded-lg" />
          <img src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762095330/image_30_cgpauu.png" alt="Nail Art 3" className="w-full h-96 object-cover rounded-lg" />
        </div>
      </div>


      {/* Why Choose Us Section */}
      <section className="bg-[#F8EFE8] py-16">
        <div className="max-w-7xl mx-auto px-4 text-start">
          <h2 className="text-4xl font-serif mb-4 text-[#1D1D1E]">Why Choose Us</h2>
          <p className="text-lg text-gray-600 mb-12">
            At GlamNails, we understand that when it comes to nail art, you have many options to choose from.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Left Column - 2 boxes */}
            <div className="space-y-6">
              {/* Years of Experience Card */}
              <div className="bg-[#F6E6D6] w-[400px] h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
                <p className="text-base text-gray-600 mb-2">Decades of expertise in nail artistry.</p>
                <ul className="list-disc pl-5 text-base text-gray-600">
                  <li>Over a decade in the nail art industry</li>
                  <li>Expertise in modern and classic designs</li>
                  <li>Highly skilled and certified professionals</li>
                  <li>Commitment to precision and creativity</li>
                </ul>
              </div>

              {/* Experienced Staff Card */}
              <div className="bg-[#F6E6D6] w-[400px] h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Experienced Staff</h3>
                <p className="text-base text-gray-600 mb-2">Dedicated professionals for nail care.</p>
                <ul className="list-disc pl-5 text-base text-gray-600">
                  <li>Certified nail technicians</li>
                  <li>Specialized in intricate nail designs</li>
                  <li>Friendly and professional service</li>
                  <li>Continuous training in latest trends</li>
                </ul>
              </div>
            </div>

            {/* Center Column - Adjusted content and image alignment */}
            <div>
              <div className="bg-[#F6E6D6] w-[400px] h-[668px] rounded-lg flex flex-col items-center mx-auto overflow-hidden">
                <div className="text-center p-6">
                  <h3 className="text-3xl font-semibold mb-4">Let's Buy Now!</h3>
                  <p className="text-base text-gray-600 mb-4">
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
              <div className="bg-[#F6E6D6] w-[400px] h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
                <p className="text-base text-gray-600 mb-2">Unmatched quality in every service.</p>
                <ul className="list-disc pl-5 text-base text-gray-600">
                  <li>Premium products and tools</li>
                  <li>Attention to detail in every design</li>
                  <li>Long-lasting and durable nail art</li>
                  <li>Customer satisfaction guaranteed</li>
                </ul>
              </div>

              {/* Trend Awareness Card */}
              <div className="bg-[#F6E6D6] w-[400px] h-[322px] p-6 rounded-lg mx-auto flex flex-col justify-center text-left">
                <div className="bg-black w-12 h-12 flex items-center justify-center rounded mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trend Awareness</h3>
                <p className="text-base text-gray-600 mb-2">Stay ahead with the latest trends.</p>
                <ul className="list-disc pl-5 text-base text-gray-600">
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

      <div className="px-6 bg-[#F8EFE8] md:px-16 lg:px-32">
        {/* <ImagesTextSection /> */}
        <HomeProducts />
      </div>

      
      {/* Special Offers Section */}
      <div className="px-6 md:px-16 lg:px-32 py-16 bg-[#F8EFE8]">
          <h2 className="text-4xl font-serif mb-4 pt-12 text-[#1D1D1E]">Uniqueness & Artistry</h2>
          <p className="text-lg text-gray-600 mb-12">
           Where every design is thoughtfully handcrafted, blending creativity and precision to reflect 
           your individuality and elevate your natural beauty.
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Card */}
          <div className="relative bg-[#F6E6D6] rounded-lg overflow-hidden flex items-center min-h-[280px]">
            <div className="w-1/2">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762118631/image_37_rrfhzb.png" 
                alt="Unique Colour of Nail Polish" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-1/2 pl-8 text-left font-serif">
              <p className="text-gray-600 text-sm mb-2">Save Upto <span className="font-bold text-black">50%</span> Off</p>
              <h3 className="text-3xl font-medium text-black mb-6 leading-tight">Unique Colour<br />of Nail Polish</h3>
              <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition uppercase text-sm font-medium">
                Shop Now
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="relative bg-[#F6E6D6] rounded-lg overflow-hidden flex items-center min-h-[280px]">
            <div className="w-1/2 h-full">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762118653/image_36_nuvp8g.png" 
                alt="New Nail Art Design Look" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 pl-8 text-left font-serif">
              <p className="text-gray-600 text-sm mb-2">New Makeup Look</p>
              <h3 className="text-3xl font-medium text-black mb-6 leading-tight">New Nail Art<br />Design Look</h3>
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
    <section className="bg-[#F8EFE8] py-16">
        <div className="max-w-7xl mx-auto px-4 text-start">
          <h2 className="text-4xl font-serif mb-4 text-[#1D1D1E]">Our Valuable Customer</h2>
            
          <p className="text-lg text-gray-600 mb-12">
            Your trust and loyalty inspire us every day, motivating us to deliver exceptional
             care and memorable experiences with every visit.
          </p>
          <div className="space-y-8">
            {/* Testimonial 1 */}
            <div className="bg-[#F6E6D6] p-6 rounded-lg flex items-start relative">
             <img 
  src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762119731/Image_tofgtm.png"
  alt="Customer 1" 
  className="w-16 h-16 rounded-full object-cover mr-6"
/>
              <div className="text-left flex-1">
                <p className="text-lg text-[#1D1D1E]/60 mb-4">"The salon itself has a warm and inviting atmosphere, creating a relaxing environment as soon as you walk through the door. The staff greeted me with a friendly smile and made me feel instantly comfortable. The nail technician who worked on my nails was incredibly talented. They took the time to listen to my preferences."</p>
                <h3 className="text-xl font-semibold text-[#1D1D1E]">Mary M. Seidel</h3>
                <p className="text-sm text-[#1D1D1E]/40">Los Angel, CA</p>
              </div>
              <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-8 right-12 w-10 h-10 "
              />
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#F6E6D6] p-6 rounded-lg flex items-start relative">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762119742/Image_1_wil6py.png" 
                alt="Customer 2" 
                className="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div className="text-left flex-1">
                <p className="text-lg text-[#1D1D1E]/60 mb-4">"The final result of my manicure was absolutely stunning. The technician skillfully applied the polish, leaving my nails with a flawless and glossy finish. I received numerous compliments on my nails, and I couldn't help but show them off proudly. The final result of my manicure was absolutely stunning."</p>
                <h3 className="text-xl font-semibold text-[#1D1D1E]">Kathy R. Crockett</h3>
                <p className="text-sm text-[#1D1D1E]/40">Manager, Office</p>
              </div>
              <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-8 right-12 w-10 h-10 "
              />
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#F6E6D6] p-6 rounded-lg flex items-start relative">
              <img 
                src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762119747/Image_2_qqblcg.png" 
                alt="Customer 3" 
                className="w-16 h-16 rounded-full object-cover mr-6"
              />
              <div className="text-left flex-1">
                <p className="text-lg text-[#1D1D1E]/60 mb-4">"Overall, my experience at GlamNails was outstanding. The professionalism, skill, the selection of nail products, colors was extensive and attention to detail demonstrated by the staff truly sets this salon apart. I left feeling pampered and confident with my beautiful nails."</p>
                <h3 className="text-xl font-semibold text-[#1D1D1E]">Belinda W. Scott</h3>
                <p className="text-sm text-[#1D1D1E]/40">Student</p>
              </div>
             <img 
                src="/quotes.png" 
                alt="Quotes" 
                className="absolute bottom-8 right-12 w-10 h-10 "
              />
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Home;
