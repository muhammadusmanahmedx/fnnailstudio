"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { Heart, ShoppingBag, User } from "lucide-react";

const Navbar = () => {

  const { isSeller, router, user, getCartCount, getWishlistCount } = useAppContext();
  const pathname = usePathname();

  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-200 text-gray-700" style={{ backgroundColor: '#F8EFE8' }}>
      <Image
        className="cursor-pointer w-40 md:w-48"
        onClick={() => router.push('/')}
        src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762083661/Frame_151_1_fnaqaz_1_vou6vn.png"
        width={160}
        height={50}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className={`transition uppercase ${pathname === '/' ? 'text-[#1D1D1E]' : 'text-[#848484]'}`}>
          HOME
        </Link>
        <Link href="/all-products" className={`transition uppercase ${pathname === '/all-products' ? 'text-[#1D1D1E]' : 'text-[#848484]'}`}>
          SHOP
        </Link>
        <Link href="/aboutus" className={`transition uppercase ${pathname === '/aboutus' ? 'text-[#1D1D1E]' : 'text-[#848484]'}`}>
          ABOUT
        </Link>
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">SELLER DASHBOARD</button>}
      </div>

      <ul className="hidden md:flex items-center gap-6">
        <div className="relative cursor-pointer group" onClick={() => router.push('/wishlist')}>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
            <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${!user ? 'text-[#848484]' : 'text-[#1D1D1E]'}`} />
          </div>
          {getWishlistCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
              {getWishlistCount() > 9 ? '9+' : getWishlistCount()}
            </span>
          )}
        </div>

        <div className="relative cursor-pointer group" onClick={() => router.push('/cart')}>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
            <ShoppingBag className={`w-5 h-5 group-hover:scale-110 transition-transform ${!user ? 'text-[#848484]' : 'text-[#1D1D1E]'}`} />
          </div>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
              {getCartCount() > 9 ? '9+' : getCartCount()}
            </span>
          )}
        </div>

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-2 text-[#848484]">
            <User className="w-5 h-5" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-4">
        {/* Mobile Wishlist Icon with Enhanced Badge */}
        <div className="relative cursor-pointer group" onClick={() => router.push('/wishlist')}>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
            <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${!user ? 'text-[#848484]' : 'text-[#1D1D1E]'}`} />
          </div>
          {getWishlistCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
              {getWishlistCount() > 9 ? '9+' : getWishlistCount()}
            </span>
          )}
        </div>
        
        {/* Mobile Cart Icon with Enhanced Badge */}
        <div className="relative cursor-pointer group" onClick={() => router.push('/cart')}>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
            <ShoppingBag className={`w-5 h-5 group-hover:scale-110 transition-transform ${!user ? 'text-[#848484]' : 'text-[#1D1D1E]'}`} />
          </div>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-orange-500 to-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white">
              {getCartCount() > 9 ? '9+' : getCartCount()}
            </span>
          )}
        </div>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        {
          user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="About Us" labelIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                } onClick={() => router.push('/aboutus')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 text-[#848484]"
            >
              <User className="w-5 h-5" />
              Account
            </button>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;