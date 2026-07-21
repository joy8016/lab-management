import express from 'express';
import { register, login, logout, getMe, verifyRole } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/verify-role', protect, verifyRole);

export default router;
