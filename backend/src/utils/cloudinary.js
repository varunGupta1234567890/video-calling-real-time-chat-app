//file already server pe upload ho chuki h it gives u local file path server se file loge or use cloudinary pe daloge uske baad file ko unlink kro
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'});
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


//file system

cloudinary.config({ 
cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
api_key:process.env.CLOUDINARY_API_KEY, 
api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        console.log("APIKEY",process.env.CLOUDINARY_API_KEY)
        //cloudinary pe upload karne ke bada local file ki koi jarurat ni hoti
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("cloudinary upload error",error)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}
const deleteOnCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId); // assuming you use Cloudinary SDK
    console.log("Deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Cloudinary delete error", error);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };



