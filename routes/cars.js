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
// const upload = multer({ dest: 'public/uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/', verifyToken, getAllCars);
router.get('/:id', verifyToken, getCarById);
router.post('/', verifyToken, onlyAdmin, upload.single('images'), createCar);
router.put('/:id', verifyToken, onlyAdmin, upload.single('images'), updateCar);
router.delete('/:id', verifyToken, onlyAdmin, deleteCar);

export default router;
