import { createContext, useState } from "react";

export const Products = createContext();

const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Shotgun",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-cHLJehZ0RXUXDvrd7P7VVmICGd2_s_vMQ&s",
      description: "A powerful shotgun for hunting.",
      price: 150,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Rifle",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4-GdEHrJfYqlKKjZJoieZu5mB0aleXFTag&s",
      description: "A long-range precision rifle.",
      price: 300,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Pistol",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-cHLJehZ0RXUXDvrd7P7VVmICGd2_s_vMQ&s",
      description: "A compact pistol for self-defense.",
      price: 120,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Sniper Rifle",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4-GdEHrJfYqlKKjZJoieZu5mB0aleXFTag&s",
      description: "A sniper rifle for extreme long-range shots.",
      price: 450,
      rating: 4.9,
    },
  ]);
  return (
    <Products.Provider value={{ products, setProducts }}>
      {children}
    </Products.Provider>
  );
};

export default ProductsContext;
