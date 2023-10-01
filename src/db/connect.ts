import mongoose from "mongoose";
import CONFIGURATION from "../config/config";
require("dotenv").config();

const { db } = CONFIGURATION;

export const connectDb = () => {
  return mongoose.connect(db.DB_URI);
};
