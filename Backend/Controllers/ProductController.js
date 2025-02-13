import { Product } from '../Models/Product.model.js';

export const addProduct = async (req, res) => {
    try {
        const { name, image, description, price } = req.body;
        const newProduct = new Product({ name, image, description, price });
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
