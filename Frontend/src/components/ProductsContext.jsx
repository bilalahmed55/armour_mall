/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const Products = createContext();

const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  });

  return (
    <Products.Provider value={{ products, setProducts }}>
      {children}
    </Products.Provider>
  );
};

export default ProductsContext;
