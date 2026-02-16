import {v2 as cloudinary}  from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:String(process.env.CLOUD_NAME),
    api_key:String(process.env.CLOUD_API_KEY),
    api_secret:String(process.env.CLOUD_API_SECRET)
});

export default cloudinary;