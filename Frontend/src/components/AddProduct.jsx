import { useState, useContext } from 'react';
import { Products } from './ProductsContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(Products);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [imgUrl, setImgurl] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newProduct = {
      name: name,
      image: imgUrl,
      description: desc,
      price: price,
      category: category
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/products/add`, newProduct);
      if (response.data.success) {
        setProducts([...products, response.data.product]);
        setName("");
        setImgurl("");
        setDesc("");
        setPrice("");
        setCategory("");

        // Wait for 3 seconds before navigating
        setTimeout(() => {
          setIsLoading(false);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("There was an error adding the product!", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-white text-center mb-6 mt-10">Add a New Product</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-left">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => { setName(e.target.value) }}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        {/* Product Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 text-left">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={(e) => { setPrice(e.target.value) }}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 text-left">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select a category</option>
            <option value="rifles">Rifles</option>
            <option value="shotguns">Shotguns</option>
            <option value="pistols">Pistols</option>
          </select>
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 text-left">Product Image</label>
          <input
            type="url"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => { setImgurl(e.target.value) }}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-left">Product Description</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => { setDesc(e.target.value) }}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="4"
            required
          />
        </div>
        {/* Modified Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`${isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-2 w-full sm:w-auto mx-auto`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Adding Product...</span>
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
