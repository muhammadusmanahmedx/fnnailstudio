import { useEffect, useState } from 'react';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs on component mount

  return (
    <div>
      <h1>Add Product</h1>
      <form>
        {/* Other form fields */}
        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Submit button */}
      </form>
    </div>
  );
};

export default AddProduct;