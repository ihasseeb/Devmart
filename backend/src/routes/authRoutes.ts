import { Router } from 'express';
import { register, login, verifyOTP, resendOTP } from '../controllers/authController';
import { registerValidation, loginValidation, validate } from '../middleware/validator';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginValidation, validate, login);

export default router;