import { Router } from 'express';
import { loginValidation, signupValidation } from '../Middlewares/Validation.js'; // Named import
import {signup, login} from '../Controllers/AuthController.js';

const router = Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

export default router;