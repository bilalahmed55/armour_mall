import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../features/CartSystem";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <img
                className="w-full h-48 object-cover"
                src={product.image}
                alt={product.name}
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                </h2>
                <p
                    className="text-sm text-gray-600 dark:text-gray-300 mt-2 h-12 overflow-hidden"
                    style={{
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        ${product.price}
                    </span>
                    <div className="flex items-center space-x-1">
                        <span className="text-sm text-yellow-500">{product.rating}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 15l-3.5 2 1-4.5L3 7l4.5-.5L10 2l2.5 4.5L17 7l-4.5 5.5L13.5 17z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <NavLink
                        to={`/product/${product.id}`}
                        state={{ product }} // Passing product data using the state
                        className="inline-block"
                    >
                        <button className="bg-blue-500 text-white p-2 rounded-lg text-sm w-24 hover:bg-blue-600 transition">
                            Info
                        </button>
                    </NavLink>

                    <button
                        className="bg-green-500 text-white p-2 rounded-lg text-sm w-24 hover:bg-green-600 transition"
                        onClick={() => dispatch(addCart(product))}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
