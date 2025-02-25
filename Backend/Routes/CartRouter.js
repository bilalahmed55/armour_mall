import { Router } from 'express';
import { getUserCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../Controllers/CartController.js';
import { verifyToken } from '../Middlewares/AuthMiddleware.js';

const router = Router();

// All cart routes require authentication
router.use(verifyToken);

router.get('/', getUserCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);

export default router;