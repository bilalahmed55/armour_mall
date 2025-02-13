import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    quantity: 0,
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
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(item =>
                !(item.id === action.payload.id && item.name === action.payload.name)
            );
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
        },
    },
});

export const { addCart, removeCart, increaseQuantity, decreaseQuantity } = CartSystem.actions;
export default CartSystem.reducer;
