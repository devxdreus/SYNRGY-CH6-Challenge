import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
import UserModel from './UserModel.js';

const CarModel = sequelize.define(
    'Car',
    {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        createdBy: { type: DataTypes.INTEGER, allowNull: false },
        updatedBy: { type: DataTypes.INTEGER },
        deletedBy: { type: DataTypes.INTEGER },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

CarModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default CarModel;
