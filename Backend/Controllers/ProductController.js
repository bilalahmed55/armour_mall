import { Product } from '../Models/Product.model.js';

export const addProduct = async (req, res) => {
    try {
        const { name, image, description, price, category } = req.body;

        // Validate required fields
        if (!name || !image || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Convert price to number if it's a string
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
        console.error('Error in addProduct:', error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        console.log('Fetching all products...');
        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }

        res.status(200).json({
            success: true,
            products,
            count: products.length
        });
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Searching for category:', category);

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category parameter is required"
            });
        }

        const products = await Product.find({
            category: category  // Exact match instead of regex
        });

        console.log(`Found ${products.length} products in category ${category}`);

        res.status(200).json({
            success: true,
            products,
            count: products.length
        });
    } catch (error) {
        console.error('Error in getProductsByCategory:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
};
