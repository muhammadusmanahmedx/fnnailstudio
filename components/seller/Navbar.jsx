import React from 'react'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {
  const { router } = useAppContext()

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <Image
        onClick={() => router.push('/')}
        className="w-28 lg:w-32 cursor-pointer"
        src="https://res.cloudinary.com/dshjm6hcx/image/upload/v1762083661/Frame_151_1_fnaqaz_1_vou6vn.png"
        alt="Logo"
        width={150}   // ✅ required
        height={50}   // ✅ required
      />
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  )
}

export default Navbar
