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
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
    },
});

export const { addCart, removeCart, increaseQuantity, decreaseQuantity } = CartSystem.actions;
export default CartSystem.reducer;
