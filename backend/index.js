import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './models/model.js';
import authRoutes from './route/auth.js';
import productRoutes from './route/product.js';
import cartRoutes from './route/cart.js';
import orderRoutes from './route/order.js';
import webhookRoute from './route/webhook.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

import './script/releaseOrder.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/webhook', webhookRoute);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
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
