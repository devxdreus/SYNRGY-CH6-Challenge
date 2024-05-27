import CarModel from '../models/CarModel.js';
import UserModel from '../models/UserModel.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await CarModel.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await CarModel.findOne({ where: { id: req.params.id } });
        if (!car) return res.status(404).json({ msg: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createCar = async (req, res) => {
    const { name, price, size, userId } = req.body;
    const img = req.file ? req.file.filename : null;

    try {
        const user = await UserModel.findOne({ where: { id: userId } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await CarModel.create({
            name,
            price,
            size,
            img,
            userId,
            createdBy: userId,
        });
        res.status(201).json({ msg: 'Car created' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateCar = async (req, res) => {
    const { name, price, size, userId } = req.body;
    console.log(name);
    const img = req.file ? req.file.filename : null;

    try {
        const car = await CarModel.findOne({ where: { id: req.params.id } });
        if (!car) return res.status(404).json({ msg: 'Car not found' });

        car.name = name || car.name;
        car.price = price || car.price;
        car.size = size || car.size;
        if (img) {
            car.img = img;
        }
        car.updatedBy = userId;

        await car.save();
        res.json({ msg: 'Car updated' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteCar = async (req, res) => {
    const { userId } = req.body;
    try {
        const car = await CarModel.findOne({ where: { id: req.params.id } });
        if (!car) return res.status(404).json({ msg: 'Car not found' });

        car.deletedBy = userId;
        await car.destroy();
        res.json({ msg: 'Car deleted' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
