import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import { readdirSync } from "fs";

const bcrypt = require('bcrypt');

// const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%!%*?&#]{8, 16}$/;

export const ResetPassword = {
    async reset(req: Request, res: Response) {
        const { pass, userId } = req.body;
        // if (!regExPassword.test(pass)) return res.send({ validation: false });
        try {
            const newPass = await bcrypt.hash(pass, 10);
            await UserRepository.FindByIdAndUpdate(userId, newPass)
            res.status(201).send("Password updated successfully")
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error")
        }

    }
}