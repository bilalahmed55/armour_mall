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
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
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
            category: {
                $regex: new RegExp(category, 'i')
            }
        });

        console.log('Found products:', products.length);

        res.status(200).json({
            success: true,
            products,
            message: `Found ${products.length} products in category ${category}`
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
