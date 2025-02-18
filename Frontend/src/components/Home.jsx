import { useContext, useState, useEffect } from "react";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
import { Products } from "./ProductsContext";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Home = () => {
  const { products } = useContext(Products);
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
    <div>
      <div className="mt-20 mb-10">
        <Slider />
      </div>

      {/* Search, Category, and Price Filter Section */}
      <div className="flex flex-wrap justify-center mb-6 gap-6">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <label htmlFor="category" className="block text-gray-700">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="rifles">Rifles</option>
            <option value="shotguns">Shotguns</option>
            <option value="pistols">Pistols</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-gray-700">Min Price</label>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded-lg w-24 shadow-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Max Price</label>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded-lg w-24 shadow-md"
          />
        </div>
      </div>

      {/* Display Product Cards */}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
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
