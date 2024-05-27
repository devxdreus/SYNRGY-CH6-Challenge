import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await UserModel.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ msg: 'User created' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await UserModel.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.role = role || user.role;

        await user.save();
        res.json({ msg: 'User updated' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { id: req.params.id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await user.destroy();
        res.json({ msg: 'User deleted' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
