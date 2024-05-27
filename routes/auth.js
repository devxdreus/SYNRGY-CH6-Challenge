import express from 'express';
import { login, refreshToken, logout } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);

export default router;
