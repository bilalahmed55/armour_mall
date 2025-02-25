import Cart from "../Models/Cart.model.js";

// Get user cart
export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create empty cart if none exists
            cart = {
                userId,
                items: [],
            };
        }

        res.status(200).json({
            success: true,
            cart: cart.items
        });
    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message
        });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, name, price, image, quantity = 1 } = req.body;

        if (!id || !name || !price || !image) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create new cart if none exists
            cart = new Cart({
                userId,
                items: [],
            });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => String(item.productId) === id && item.name === name
        );

        if (existingItemIndex > -1) {
            // Update existing item
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].totalPrice =
                cart.items[existingItemIndex].price * cart.items[existingItemIndex].quantity;
        } else {
            // Add new item
            cart.items.push({
                productId: id,
                name,
                price,
                image,
                quantity,
                totalPrice: price * quantity
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart: cart.items
        });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({
            success: false,
            message: "Error adding to cart",
            error: error.message
        });
    }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, name, quantity } = req.body;

        if (!id || !name || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            item => String(item.productId) === id && item.name === name
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity and total price
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].totalPrice = cart.items[itemIndex].price * quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: cart.items
        });
    } catch (error) {
        console.error("Error in updateCartItem:", error);
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: error.message
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            item => String(item.productId) === id && item.name === name
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        // Remove item
        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart: cart.items
        });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({
            success: false,
            message: "Error removing from cart",
            error: error.message
        });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart: cart.items
        });
    } catch (error) {
        console.error("Error in clearCart:", error);
        res.status(500).json({
            success: false,
            message: "Error clearing cart",
            error: error.message
        });
    }
};