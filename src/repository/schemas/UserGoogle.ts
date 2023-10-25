import { Schema, model } from "mongoose";

const UserGoogleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    user_name: { type: String, required: true },
    picture: { type: String, required: true },
    type: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserGoogleModel = model("User_Google", UserGoogleSchema);
