/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../features/CartSystem";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
                <img
                    src={product.image || defaultImage}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <button
                        onClick={() => dispatch(addCart(product))}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
                <NavLink
                    to={`/product/${product._id}`}
                    state={{product}}
                    className="mt-2 inline-block text-blue-500 hover:underline font-medium"
                >
                    View Details
                </NavLink>
            </div>
        </div>
    );
};

export default ProductCard;
