export const cloudinary = require("cloudinary").v2;
import CONFIGURATION from "../config/config";

cloudinary.config({
  cloud_name: CONFIGURATION.cloudinary.NAME,
  api_key: CONFIGURATION.cloudinary.KEY,
  api_secret: CONFIGURATION.cloudinary.SECRET,
});
