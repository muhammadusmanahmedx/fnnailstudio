import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <>
    <div className="">
      <h2 className="text-4xl font-serif pt-12 mb-4 text-[#1D1D1E]">Popular Products</h2>
          <p className="text-lg text-gray-600 mb-2">
            At GlamNails, we understand that when it comes to nail art, you have many options to choose from.
          </p>
    <div className="flex flex-col  w-full items-center ">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border bg-[#1d1d1e] rounded text-white hover:bg-[#2e2e34] transition">
        See more
      </button>
    </div>
    </div>
    </>
  );
};

export default HomeProducts;
