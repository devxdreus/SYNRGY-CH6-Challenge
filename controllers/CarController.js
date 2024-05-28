import CarModel from '../models/CarModel.js';
import UserModel from '../models/UserModel.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await CarModel.findAll({
            include: [
                { model: UserModel, as: 'createdByUser' },
                { model: UserModel, as: 'updatedByUser' },
                { model: UserModel, as: 'deletedByUser' },
            ],
        });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await CarModel.findByPk(req.params.id, {
            include: [
                { model: UserModel, as: 'createdByUser' },
                { model: UserModel, as: 'updatedByUser' },
                { model: UserModel, as: 'deletedByUser' },
            ],
        });
        if (!car) return res.status(404).json({ msg: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createCar = async (req, res) => {
    const { model, rentPerDay } = req.body;
    const images = req.file ? req.file.filename : null;
    const createdBy = req.user.id;

    try {
        const user = await UserModel.findByPk(createdBy);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const newCar = await CarModel.create({
            model,
            rentPerDay,
            images,
            createdBy,
        });
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateCar = async (req, res) => {
    const { model, rentPerDay } = req.body;
    const images = req.file ? req.file.filename : null;
    const updatedBy = req.user.id;

    try {
        const car = await CarModel.findByPk(req.params.id, {
            include: [
                { model: UserModel, as: 'createdByUser' },
                { model: UserModel, as: 'updatedByUser' },
                { model: UserModel, as: 'deletedByUser' },
            ],
        });
        if (!car) return res.status(404).json({ msg: 'Car not found' });

        car.model = model || car.model;
        car.rentPerDay = rentPerDay || car.rentPerDay;
        car.images = images || car.images;
        car.updatedBy = updatedBy;

        await car.save();
        res.json(car);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteCar = async (req, res) => {
    const deletedBy = req.user.id;

    try {
        const car = await CarModel.findByPk(req.params.id, {
            include: [
                { model: UserModel, as: 'createdByUser' },
                { model: UserModel, as: 'updatedByUser' },
                { model: UserModel, as: 'deletedByUser' },
            ],
        });
        if (!car) return res.status(404).json({ msg: 'Car not found' });

        car.is_deleted = true;
        car.deletedBy = deletedBy;
        await car.save();
        res.json({ msg: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
