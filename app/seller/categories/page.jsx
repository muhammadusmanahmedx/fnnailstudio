'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideBar from '@/components/seller/Sidebar';
import Navbar from '@/components/seller/Navbar';
import Footer from '@/components/seller/Footer';
import Loading from '@/components/Loading';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, category: null });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleDeleteClick = (category) => {
    setDeleteModal({ show: true, category });
  };

  const handleDeleteConfirm = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await axios.delete(`/api/categories?id=${deleteModal.category._id}`);
      
      if (data.success) {
        setCategories(categories.filter(category => category._id !== deleteModal.category._id));
        toast.success(data.message || 'Category deleted successfully');
      } else {
        toast.error(data.message || 'Failed to delete category');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setSubmitLoading(false);
      setDeleteModal({ show: false, category: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, category: null });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleUpdate = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      setSubmitLoading(true);
      const { data } = await axios.put('/api/categories', {
        id: editingCategory._id,
        name: categoryName.trim()
      });

      if (data.success) {
        setCategories(categories.map(category => 
          category._id === editingCategory._id ? data.category : category
        ));
        setEditingCategory(null);
        setCategoryName('');
        toast.success(data.message || 'Category updated successfully');
      } else {
        toast.error(data.message || 'Failed to update category');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update category');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      setSubmitLoading(true);
      const { data } = await axios.post('/api/categories', {
        name: categoryName.trim()
      });

      if (data.success) {
        setCategories([...categories, data.category]);
        setCategoryName('');
        toast.success(data.message || 'Category added successfully');
      } else {
        toast.error(data.message || 'Failed to add category');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add category');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setCategoryName('');
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/categories');
      
      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.message || 'Failed to fetch categories');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex h-screen bg-pink-50 md:w-[calc(100%-16rem)]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-screen flex flex-col justify-between">
          {loading ? (
            <Loading />
          ) : (
          <div className="w-full lg:p-10 md:p-6 p-3">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="pb-2 md:pb-4 text-lg md:text-xl font-medium text-pink-700">All Categories</h2>
            </div>
            
            {/* Add/Edit Category Form */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white rounded-md border border-pink-500/20">
              <h4 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-pink-700">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h4>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-stretch sm:items-center">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm md:text-base border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                {editingCategory ? (
                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={handleUpdate}
                      disabled={submitLoading}
                      className="px-3 md:px-4 py-2 text-sm md:text-base bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitLoading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 md:px-4 py-2 text-sm md:text-base bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAdd}
                    disabled={submitLoading}
                    className="px-3 md:px-4 py-2 text-sm md:text-base bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitLoading ? 'Adding...' : 'Add Category'}
                  </button>
                )}
              </div>
            </div>

            {/* Categories Table */}
            <div className="flex flex-col items-center max-w-full w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
              <div className="w-full overflow-x-auto">
                <table className="table-fixed w-full min-w-[500px] overflow-hidden">
                  <thead className="text-gray-900 text-xs md:text-sm text-left bg-gray-50">
                    <tr>
                      <th className="w-2/3 md:w-2/3 px-2 md:px-4 py-2 md:py-3 font-medium truncate">Category Name</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium truncate max-sm:hidden">Products</th>
                      <th className="px-2 md:px-4 py-2 md:py-3 font-medium truncate text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm text-gray-500">
                    {categories.map((category) => (
                      <tr key={category._id} className="border-t border-gray-500/20 hover:bg-gray-50">
                        <td className="px-2 md:px-4 py-2 md:py-3 truncate">
                          <span className="text-gray-900 font-medium text-sm md:text-base">{category.name}</span>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 max-sm:hidden text-xs md:text-sm">{category.products} products</td>
                        <td className="px-2 md:px-4 py-2 md:py-3">
                          <div className="flex items-center justify-center gap-1 md:gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-1.5 md:p-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              title="Edit Category"
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(category)}
                              className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete Category"
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
          {/* <Footer /> */}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Category</h3>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the category "{deleteModal.category?.name}"? 
                {deleteModal.category?.products > 0 && (
                  <span className="text-red-600 font-medium">
                    This category has {deleteModal.category.products} products associated with it.
                  </span>
                )}
                <br />This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
