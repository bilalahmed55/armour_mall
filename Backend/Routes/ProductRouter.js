import { Router } from 'express';
import { addProduct, getProducts, getProductsByCategory } from '../Controllers/ProductController.js';

const router = Router();

router.post('/add', addProduct);

router.get('/', getProducts);

router.get('/category/:category', getProductsByCategory);

export default router;