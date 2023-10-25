import cloudinaryLibrary = require("cloudinary");
export const cloudinary = cloudinaryLibrary.v2;
import CONFIGURATION from "../config/config";

cloudinary.config({
  cloud_name: CONFIGURATION.cloudinary.NAME,
  api_key: CONFIGURATION.cloudinary.KEY,
  api_secret: CONFIGURATION.cloudinary.SECRET,
});

export const uploadImage = async (imagePath: string) => {
  const imageUploaded = await cloudinary.uploader.upload(imagePath, {
    resource_type: "image",
    folder: "images/",
    gravity: "east",
    height: 500,
    width: 500,
    crop: "scale",
    overwrite: true,
  });
  return imageUploaded;
};
export const uploadAudioFile = async (name: string, imagePath: string) => {
  const imageUploaded = await cloudinary.uploader.upload(imagePath, {
    resource_type: "video",
    public_id: name,
    folder: "audio/",
    overwrite: true,
  });
  return imageUploaded;
};
