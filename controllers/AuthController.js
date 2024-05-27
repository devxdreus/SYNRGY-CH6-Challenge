import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '20m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET
    );
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Wrong password' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refresh_token = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Strict',
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = await UserModel.findOne({
            where: { refresh_token: refreshToken },
        });
        if (!user) return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);

                const accessToken = generateAccessToken(user);
                res.json({ accessToken });
            }
        );
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    try {
        const user = await UserModel.findOne({
            where: { refresh_token: refreshToken },
        });
        if (!user) return res.sendStatus(204);

        user.refresh_token = null;
        await user.save();

        res.clearCookie('refreshToken');
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'role'],
        });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
