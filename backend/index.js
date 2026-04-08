import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './models/model.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
