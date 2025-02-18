import { useContext, useState } from "react";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
import { Products } from "./ProductsContext";

const Home = () => {
  const { products } = useContext(Products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter products based on both search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // const handleCategoryChange = (e)=>{
  //   SelectedCategory(e.target.value)
  // }

  return (
    <div>
      <div className="mt-20 mb-10">
        <Slider />
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-center mb-6 gap-6">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="">
          <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 text-left">
            Product Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">All Categories</option>
            <option value="rifles">Rifles</option>
            <option value="shotguns">Shotguns</option>
            <option value="pistols">Pistols</option>
          </select>
        </div>
      </div>

      {/* Display Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            {searchQuery || selectedCategory
              ? "No products found matching your criteria."
              : "No products available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
