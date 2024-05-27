import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const UserModel = sequelize.define(
    'User',
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        refresh_token: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING, allowNull: false },
    },
    {
        timestamps: true,
    }
);

export default UserModel;
