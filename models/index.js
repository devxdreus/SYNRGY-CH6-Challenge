import User from './UserModel.js';
import Car from './CarModel.js';

User.hasMany(Car, { foreignKey: 'userId' });
Car.belongsTo(User, { foreignKey: 'userId' });

export { User, Car };
