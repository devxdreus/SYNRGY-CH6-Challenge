import express from 'express';
import {
    login,
    refreshToken,
    logout,
    getCurrentUser,
} from '../controllers/AuthController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);
router.get('/current-user', verifyToken, getCurrentUser);

export default router;
