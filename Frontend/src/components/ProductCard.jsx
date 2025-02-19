/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../features/CartSystem";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button
                        onClick={() => dispatch(addCart(product))}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
