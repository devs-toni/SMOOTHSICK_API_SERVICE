import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        user_name: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String },
        role: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model('User', UserSchema);

