import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
require('dotenv').config();

export class Verification {
    verify(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}