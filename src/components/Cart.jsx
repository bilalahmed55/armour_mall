import { useSelector, useDispatch } from 'react-redux';
import { removeCart, increaseQuantity, decreaseQuantity } from '../features/CartSystem';

const Cart = () => {
    const cartItems = useSelector(state => state.name.cart);
    const dispatch = useDispatch();

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 mt-4">
            <h2 className="text-3xl font-semibold text-white">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className='text-white'>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                        <div className="flex-1 ml-4">
                            <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                            <p className='text-white'>${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))} className="bg-gray-200 p-2 rounded">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => dispatch(increaseQuantity({ id: item.id }))} className="bg-gray-200 p-2 rounded">+</button>
                            <button onClick={() => dispatch(removeCart({ id: item.id }))} className="bg-red-500 text-white p-2 rounded">Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
