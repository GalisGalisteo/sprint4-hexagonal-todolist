import mongoose from "mongoose";
import app from "../../../config/app.js";

import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || '';
const PORT = 8000;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    })
    .finally(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
