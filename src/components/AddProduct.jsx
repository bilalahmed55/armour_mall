import { useState } from 'react';
import { useContext } from 'react';
import { Products } from './ProductsContext';
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
  const navigate = useNavigate()
  const {products, setProducts} = useContext(Products)

  const [name, setName] = useState('');
  const [imgUrl, setImgurl] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name: name,
      image: imgUrl,
      description: desc,
      price: price,
    }

    setProducts([...products, newProduct])

    setName("")
    setImgurl("")
    setDesc("")
    setPrice("")
    
    navigate('/home')
  }

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
            
            onChange={(e)=>{setName(e.target.value)}}
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
            value={products.price}
            onChange={(e)=>{setPrice(e.target.value)}}
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
            value={products.description}
            onChange={(e)=>{setDesc(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="4"
            required
          />
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 text-left">Product Image</label>
          <input
            type="url"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e)=>{setImgurl(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
