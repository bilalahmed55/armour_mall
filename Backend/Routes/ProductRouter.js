import { Router } from 'express';
import { addProduct, getProducts, getProductsByCategory } from '../Controllers/ProductController.js';
import { verifyToken, isAdmin } from '../Middlewares/AuthMiddleware.js';

const router = Router();

// Protected route - only admins can add products
router.post('/add', verifyToken, isAdmin, addProduct);

// Public routes - anyone can view products
router.get('/', getProducts);
router.get('/category/:category', getProductsByCategory);

export default router;