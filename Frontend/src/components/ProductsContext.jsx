/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

export const Products = createContext();

const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        console.log('Products response:', response.data);

        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    console.error('ProductsContext Error:', error);
  }

  return (
    <Products.Provider value={{ products, setProducts, loading, error }}>
      {children}
    </Products.Provider>
  );
};

export default ProductsContext;
