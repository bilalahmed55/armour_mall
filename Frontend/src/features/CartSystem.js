import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config/api"; // Adjust this import based on your project structure

// Async thunks for API calls
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return [];

            const response = await axios.get(`${API_BASE_URL}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);

export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async (item, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // Handle local cart if user is not logged in
                return item;
            }

            const response = await axios.post(
                `${API_BASE_URL}/api/cart/add`,
                item,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item to cart");
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ id, name, quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return { id, name, quantity };

            const response = await axios.put(
                `${API_BASE_URL}/api/cart/update`,
                { id, name, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cart");
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    "cart/removeItemFromCart",
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return { id, name };

            const response = await axios.delete(
                `${API_BASE_URL}/api/cart/remove`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: { id, name }
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove item from cart");
        }
    }
);

export const clearCartItems = createAsyncThunk(
    "cart/clearCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await axios.delete(
                `${API_BASE_URL}/api/cart/clear`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to clear cart");
        }
    }
);

// Load cart from localStorage (if available) for non-logged in users
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null
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
        // Add a reducer to merge local cart with fetched cart after login
        mergeWithServerCart: (state, action) => {
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle addItemToCart
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                // If we received an array of cart items from server, replace cart
                if (Array.isArray(action.payload)) {
                    state.cart = action.payload;
                } else {
                    // Otherwise add the item locally (when user is not logged in)
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
                }
                saveCartToStorage(state.cart);
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle updateCartItemQuantity
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.cart = action.payload;
                } else {
                    // Local update if server call was not made
                    const { id, name, quantity } = action.payload;
                    const item = state.cart.find(item => item.id === id && item.name === name);
                    if (item) {
                        item.quantity = quantity;
                        item.totalPrice = item.price * quantity;
                    }
                }
                saveCartToStorage(state.cart);
            })

            // Handle removeItemFromCart
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.cart = action.payload;
                } else {
                    // Local removal if server call was not made
                    const { id, name } = action.payload;
                    state.cart = state.cart.filter(item => !(item.id === id && item.name === name));
                }
                saveCartToStorage(state.cart);
            })

            // Handle clearCartItems
            .addCase(clearCartItems.fulfilled, (state) => {
                state.loading = false;
                state.cart = [];
                saveCartToStorage(state.cart);
            });
    }
});

export const {
    addCart,
    removeCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    mergeWithServerCart
} = CartSystem.actions;

export default CartSystem.reducer;