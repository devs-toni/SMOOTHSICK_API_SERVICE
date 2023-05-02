import mongoose from "mongoose"
import CONFIGURATION from "../config/config";

const { db } = CONFIGURATION;

export const connectDb = () => {
  return mongoose.connect(db.DB_URI);
}