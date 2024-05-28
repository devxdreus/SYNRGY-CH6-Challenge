import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';
import UserModel from './UserModel.js';

const Car = sequelize.define(
    'Car',
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rentPerDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        getterMethods: {
            images: function () {
                return `http://localhost:5000/uploads/${this.getDataValue(
                    'images'
                )}`;
            },
        },
    }
);

Car.images;

Car.belongsTo(UserModel, { as: 'createdByUser', foreignKey: 'createdBy' });
Car.belongsTo(UserModel, { as: 'updatedByUser', foreignKey: 'updatedBy' });
Car.belongsTo(UserModel, { as: 'deletedByUser', foreignKey: 'deletedBy' });

export default Car;
