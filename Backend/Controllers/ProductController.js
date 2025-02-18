import { Product } from "../Models/Product.model.js";

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, image, description, price, category } = req.body;

        if (!name || !image || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const numericPrice = Number(price);
        if (isNaN(numericPrice)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid number"
            });
        }

        const newProduct = new Product({
            name,
            image,
            description,
            price: numericPrice,
            category
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        });
    }
};

// Fetch products with filtering
export const getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            products,
            count: products.length
        });
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};

// Fetch products by category (separate endpoint)
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category parameter is required"
            });
        }

        const products = await Product.find({ category });

        res.status(200).json({
            success: true,
            products,
            count: products.length
        });
    } catch (error) {
        console.error("Error in getProductsByCategory:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};
