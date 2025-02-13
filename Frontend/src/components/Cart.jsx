import { useSelector, useDispatch } from 'react-redux';
import { removeCart, increaseQuantity, decreaseQuantity } from '../features/CartSystem';

const Cart = () => {
    const cartItems = useSelector(state => state.name.cart);
    const dispatch = useDispatch();

    // Calculate cart totals
    const cartSummary = cartItems.reduce((summary, item) => {
        return {
            totalQuantity: summary.totalQuantity + item.quantity,
            totalValue: summary.totalValue + item.totalPrice
        };
    }, { totalQuantity: 0, totalValue: 0 });

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
                                    onClick={() => dispatch(decreaseQuantity({ id: item.id, name: item.name }))}
                                    className="bg-gray-200 p-2 rounded"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold text-white">{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(increaseQuantity({ id: item.id, name: item.name }))}
                                    className="bg-gray-200 p-2 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => dispatch(removeCart({ id: item.id, name: item.name }))}
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
                                    <p className="text-white font-semibold">${cartSummary.totalValue}</p>
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
