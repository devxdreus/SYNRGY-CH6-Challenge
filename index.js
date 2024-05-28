import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelize from './config/Database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import carRoutes from './routes/cars.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads'));
app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/cars', carRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log('Failed to sync database:', err));
