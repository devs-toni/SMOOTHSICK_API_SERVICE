import { NextFunction, Request, Response } from "express";
//eslint-disable-next-line
const jwt = require('jsonwebtoken')
import { UserModel } from "../repository/schemas/User";
import { UserGoogleModel } from "../repository/schemas/UserGoogle";

export const tokenChecker = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).send('Access Denied')
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(id)
        if (user) {
            res.locals.user = user
            next()
        }
        if (user === null) {
            const userGoogle = await UserGoogleModel.findById(id)
            res.locals.user = userGoogle
            next()
        }


    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid Token')
    }
}