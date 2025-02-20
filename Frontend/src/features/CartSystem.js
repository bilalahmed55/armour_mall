import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage (if available)
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    cart: loadCartFromStorage(),
    quantity: 0,
};

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const CartSystem = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const existingItem = state.cart.find(item =>
                item.id === action.payload.id &&
                item.name === action.payload.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.cart.push({
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price
                });
            }

            saveCartToStorage(state.cart);
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(item =>
                !(item.id === action.payload.id && item.name === action.payload.name)
            );
            saveCartToStorage(state.cart);
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find(item =>
                item.id === action.payload.id &&
                item.name === action.payload.name
            );
            if (item) {
                item.quantity += 1;
                item.totalPrice = item.price * item.quantity;
            }
            saveCartToStorage(state.cart);
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find(item =>
                item.id === action.payload.id &&
                item.name === action.payload.name
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.price * item.quantity;
            }
            saveCartToStorage(state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            saveCartToStorage(state.cart);
        },
    },
});

export const { addCart, removeCart, increaseQuantity, decreaseQuantity, clearCart } = CartSystem.actions;
export default CartSystem.reducer;
