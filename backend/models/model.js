import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URL;

const db=async()=>{
    try{
 
         await mongoose.connect(mongoURL);
            console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);   
    }
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = fs.readdirSync(__dirname).filter((file) => {
    return file.endsWith('.js') && file !== path.basename(__filename);
});

for (const file of files) {
    const model = await import(pathToFileURL(path.join(__dirname, file)).href);
    const modelName = model.default.modelName;
    db[modelName] = model.default;
}

export default db;