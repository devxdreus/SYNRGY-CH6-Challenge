import express from 'express';
import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/CarController.js';
import { verifyToken, onlyAdmin } from '../middleware/AuthMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

router.get('/', verifyToken, getAllCars);
router.get('/:id', verifyToken, getCarById);
router.post('/', verifyToken, onlyAdmin, upload.single('img'), createCar);
router.put('/:id', verifyToken, onlyAdmin, upload.single('img'), updateCar);
router.delete('/:id', verifyToken, onlyAdmin, deleteCar);

export default router;
