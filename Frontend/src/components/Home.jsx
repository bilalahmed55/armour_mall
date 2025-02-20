import { useContext, useState, useEffect } from "react";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
import { Products } from "./ProductsContext";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Home = () => {
  //const context = useContext(Products);
  //const { products } = context || {};  // Add fallback for context
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products based on category and price range
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.append("category", selectedCategory);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);

        const response = await axios.get(`${API_BASE_URL}/api/products?${queryParams.toString()}`);

        if (response.data.success) {
          setFilteredProducts(response.data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  // Handle search filter separately (client-side)
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const searchFiltered = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchFiltered);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-20 mb-10">
        <Slider />
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-6 px-4">
        {/* Search Input */}
        <label htmlFor="category" className="block mb-1 text-white">
            Seach For Product
          </label>
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Select */}
        <div className="w-full sm:w-auto">
          <label htmlFor="category" className="block text-white mb-1">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="rifles">Rifles</option>
            <option value="shotguns">Shotguns</option>
            <option value="pistols">Pistols</option>
          </select>
        </div>

        {/* Price Range Inputs */}
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <label className="block text-white mb-1">Min Price</label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full sm:w-24 p-2 border rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 sm:flex-none">
            <label className="block text-white mb-1">Max Price</label>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full sm:w-24 p-2 border rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center text-gray-600 py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full py-8">
              {searchQuery || selectedCategory || minPrice || maxPrice
                ? "No products found matching your criteria."
                : "No products available."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
