import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if(!localFilePath) {
            throw new Error("Local file path is required");
            return null;
        }

        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: "auto",
        })

        fs.unlinkSync(localFilePath); // Delete the local file after upload

        return response; 

    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new Error("Failed to upload image to Cloudinary");
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {

        if(!publicId) {
            throw new Error("Public ID is required to delete image");
            return null;
        }

        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result !== 'ok') {
            throw new Error("Failed to delete image from Cloudinary");
        }

        return response.result === 'ok' ? true : false;

    } catch (error) {
        throw new Error("Failed to delete image from Cloudinary");
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };