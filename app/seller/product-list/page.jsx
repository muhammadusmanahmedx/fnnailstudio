'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";

// import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, product: null });
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchSellerProduct = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete product handlers
  const handleDeleteClick = (product) => {
    setDeleteModal({ show: true, product });
  };

  const handleDeleteConfirm = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await axios.delete(`/api/product/delete?id=${deleteModal.product._id}`);

      if (data.success) {
        setProducts(products.filter(product => product._id !== deleteModal.product._id));
        toast.success(data.message || 'Product deleted successfully');
      } else {
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setSubmitLoading(false);
      setDeleteModal({ show: false, product: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, product: null });
  };

  // Edit product handler
  const handleEdit = (product) => {
    router.push(`/seller/edit/${product._id}`);
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  // Add debugging logs to verify product data
  useEffect(() => {
    console.log("Fetched products:", products);
  }, [products]);


  return (
    <div className="flex-1 flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full lg:p-10 md:p-6 p-3">
          <h2 className="pb-3 md:pb-4 text-lg md:text-xl font-medium text-pink-700 text-center md:text-left">
            All Products
          </h2>
          <div className="flex flex-col items-center max-w-full w-full overflow-hidden rounded-md bg-white border border-pink-500/20">
            <div className="w-full overflow-x-auto">
              <table className="table-auto w-full min-w-[300px] md:min-w-[600px] overflow-hidden">
                <thead className="text-pink-900 text-xs md:text-sm text-left bg-pink-200">
                  <tr>
                    <th className="w-2/3 md:w-2/5 px-2 md:px-4 py-2 md:py-3 font-medium truncate">
                      Product
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 font-medium truncate hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 font-medium truncate">Price</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 font-medium truncate text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm text-pink-500">
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="border-t border-pink-500/20 hover:bg-pink-100"
                    >
                      <td className="px-2 md:px-4 py-2 md:py-3 flex items-center space-x-2 md:space-x-3">
                        <div className="bg-pink-500/10 rounded p-1 md:p-2 flex-shrink-0">
                          <Image
                            src={product.image[0]}
                            alt="product Image"
                            className="w-10 h-10 md:w-16 md:h-16 object-cover"
                            width={64}
                            height={64}
                          />
                        </div>
                        <span className="truncate text-xs md:text-sm leading-tight">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell text-xs md:text-sm">
                        {product.category}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium">
                        {product.offerPrice && product.offerPrice > 0 ? (
                          <>
                            <span className="line-through text-gray-500">
                              Rs{product.price}
                            </span>
                            <span className="ml-2 text-pink-600">
                              Rs{product.offerPrice}
                            </span>
                          </>
                        ) : (
                          <span>Rs{product.price}</span>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1.5 md:p-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                            title="Edit Product"
                          >
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Product"
                          >
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => router.push(`/product/${product._id}`)}
                            className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="View Product"
                          >
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Product</h3>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete "{deleteModal.product?.name}"? <br />
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={submitLoading}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;