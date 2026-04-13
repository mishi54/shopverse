import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './models/model.js';
import authRoutes from './route/auth.js';
import productRoutes from './route/product.js';
import cartRoutes from './route/cart.js';
import orderRoutes from './route/order.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

db();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
