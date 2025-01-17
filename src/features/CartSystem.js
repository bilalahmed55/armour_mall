import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    quantity:0
}

const cartSystem = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action)=>{
            state.cart.push(action.payload)
        }
    }
})

export const {addCart} = cartSystem.actions;

export default cartSystem.reducer;