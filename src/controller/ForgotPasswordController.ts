import { Request, Response } from "express"
import { UserRepository } from "../repository/UserRepository"
//eslint-disable-next-line
const nodemailer = require("nodemailer")
//eslint-disable-next-line
const jwt = require("jsonwebtoken")
//eslint-disable-next-line
require("dotenv").config()

export const ForgotPassword = {
    async getUserData(req: Request, res: Response) {
        const email = req.body.email;
        if (req.body.email == "") {
            res.status(400).send("Email is required");
        }
        try {
            const user = await UserRepository.get(email);
            const id: string = user?.id;
            
            if (!user) return res.status(403).send("User not found");
            const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
            const emailPort = "http://localhost:5173/#/recover";
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: "Smoothsick password reminder",
                text: `${emailPort}/${id}/${token}`
            }

            transporter.sendMail(mailOptions, (err: string, info: string) => {
                if (err) console.error(`An error has occurred`, err)
                console.log(`Response: ${info}`);
                res.status(200).send({ message: "Email for recovery has been sent", token, id });
            })
        } catch (error) {
            res.status(500).send(` An error has occurred: ${error}`);
        }


    }

}