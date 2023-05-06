import mongoose from "mongoose";
import CONFIGURATION from "../config/config";
require("dotenv").config();

const { db } = CONFIGURATION;

export const connectDb = () => {
  return mongoose.connect(db.DB_URI);
};

/* export const connectDb = () => {
    return mongoose.connect(`${process.env.DB_URI_PROD_KEY}${__dirname}/mongo_key.pem`);
}; */
