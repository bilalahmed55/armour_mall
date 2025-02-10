import { Router } from 'express';
import { addProduct, getProducts } from '../Controllers/ProductController.js';

const router = Router();

router.post('/add', addProduct);

router.get('/', getProducts);

export default router;