import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeItemFromCart,
    updateCartItemQuantity,
    fetchCart
} from '../features/CartSystem';

const Cart = () => {
    const { cart: cartItems, loading } = useSelector(state => state.name);
    const user = useSelector(state => state.user?.user); // Assuming you have user state
    const dispatch = useDispatch();

    useEffect(() => {
        // Only fetch cart from server if user is logged in
        if (user && user.token) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

    // Calculate cart totals
    const cartSummary = cartItems.reduce((summary, item) => {
        return {
            totalQuantity: summary.totalQuantity + item.quantity,
            totalValue: summary.totalValue + item.totalPrice
        };
    }, { totalQuantity: 0, totalValue: 0 });

    // Handler for increasing quantity
    const handleIncreaseQuantity = (item) => {
        dispatch(updateCartItemQuantity({
            id: item.id,
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // Handler for decreasing quantity
    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(updateCartItemQuantity({
                id: item.id,
                name: item.name,
                quantity: item.quantity - 1
            }));
        }
    };

    // Handler for removing item
    const handleRemoveItem = (item) => {
        dispatch(removeItemFromCart({
            id: item.id,
            name: item.name
        }));
    };

    if (loading) {
        return <div className="max-w-6xl mx-auto p-6 mt-4 text-white">Loading cart...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 mt-4">
            <h2 className="text-3xl font-semibold text-white">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className='text-white'>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                            <div className="flex-1 ml-4">
                                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                                <p className='text-white'>Price: ${item.price}</p>
                                <p className='text-white'>Total: ${item.totalPrice}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleDecreaseQuantity(item)}
                                    className="bg-gray-200 p-2 rounded"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold text-white">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncreaseQuantity(item)}
                                    className="bg-gray-200 p-2 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Cart Summary Section */}
                    <div className="mt-8 border-t pt-6">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-2xl font-semibold text-white mb-4">Cart Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-white">Total Items:</p>
                                    <p className="text-white font-semibold">{cartSummary.totalQuantity}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white">Total Value:</p>
                                    <p className="text-white font-semibold">${cartSummary.totalValue.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;