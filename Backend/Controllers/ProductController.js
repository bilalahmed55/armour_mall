import { Product } from '../Models/Product.model.js';

export const addProduct = async (req, res) => {
    try {
        const { name, image, description, price, category } = req.body;
        const newProduct = new Product({ name, image, description, price, category });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", success: true, product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
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
