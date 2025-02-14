import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { useDispatch } from 'react-redux';
import { addCart } from '../../features/CartSystem';

const CategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching from:', `${API_BASE_URL}/api/products/category/${category}`);
                const response = await axios.get(`${API_BASE_URL}/api/products/category/${category}`);
                console.log('Response:', response.data);

                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    setError('Failed to fetch products: ' + response.data.message);
                }
            } catch (err) {
                console.error('Error details:', err);
                setError(`Failed to fetch products: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    const handleAddToCart = (product) => {
        dispatch(addCart(product));
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (error) return (
        <div className="text-red-500 text-center mt-20">
            <p>{error}</p>
            <p className="text-sm mt-2">Category: {category}</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 capitalize">{category}</h2>
            {products.length === 0 ? (
                <p className="text-white text-center">No products found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                                <p className="text-gray-300 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-white text-lg">${product.price}</span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryProducts; 