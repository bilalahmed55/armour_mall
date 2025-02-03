import Slider from "./Slider";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { Products } from "./ProductsContext";


const Home = () => {
  const { products } = useContext(Products);
  return (
    
      <div>
        <div className="mt-20 mb-10">
          <Slider />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {/* Displaying product cards */}
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        
      </div>
    
  );
};

export default Home;
