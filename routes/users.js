import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/UserController.js';
import { verifyToken, onlyAdmin } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, onlyAdmin, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, onlyAdmin, createUser);
// router.post('/', createUser);
router.put('/:id', verifyToken, onlyAdmin, updateUser);
router.delete('/:id', verifyToken, onlyAdmin, deleteUser);

export default router;
