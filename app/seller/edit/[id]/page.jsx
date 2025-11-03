'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

const EditProduct = () => {
  const { getToken, categories, router } = useAppContext();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [stock, setStock] = useState('');

  // Fetch product data
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/${id}`);

      if (data.success) {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price.toString());
        setOfferPrice(product.offerPrice.toString());
        setStock(product.stock > 0 ? 'instock' : 'outofstock');
        setExistingImages(product.image || []);
      } else {
        toast.error(data.message || 'Failed to fetch product data');
        router.push('/seller/product-list');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch product data');
      router.push('/seller/product-list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  useEffect(() => {
    // Set first category as default if available and category is not set
    if (categories.length > 0 && !category) {
      setCategory(categories[0].name);
    }
  }, [categories, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);
    formData.append('stock', stock);
    formData.append('existingImages', JSON.stringify(existingImages));

    // Add new files
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const { data } = await axios.put(`/api/product/update/${id}`, formData);

      if (data.success) {
        toast.success(data.message || 'Product updated successfully');
        router.push('/seller/product-list');
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitLoading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="md:p-10 p-4">
        <h2 className="text-lg font-medium mb-5">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* Existing Images */}
            {existingImages.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  className="max-w-24 cursor-pointer object-cover rounded border"
                  src={image}
                  width={100}
                  height={100}
                  alt={`Existing image ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}

            
            {/* New Image Upload slots */}
            {[...Array(4 - existingImages.length)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input 
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }} 
                  type="file" 
                  id={`image${index}`} 
                  hidden 
                />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Category and Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories.length === 0 ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>
          
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="stock">
              Stock Status
            </label>
            <select
              id="stock"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            >
              <option value="">Select Status</option>
              <option value="instock">In Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={submitLoading} className="px-8 py-2.5 bg-pink-600 text-white font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed">
            {submitLoading ? 'UPDATING...' : 'UPDATE'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/seller/product-list')}
            className="px-8 py-2.5 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 transition-colors"
          >
            CANCEL
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditProduct;