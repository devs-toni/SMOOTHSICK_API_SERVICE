import { Request, Response } from "express";
import { FormLogin, FormRegister } from "../entity/User";
import { IUserLogin, IUserRegister } from "../models/User";
import { UserRepository } from "../repository/UserRepository";
const bcrypt = require('bcrypt')

export const UserController = {
    async register(req: Request, res: Response) {
        const params: FormRegister = req.body;
        const { form } = params;
        await bcrypt.hash(form.password, 10, (error: string, hash: string) => {
            if (error) throw error
            const user: IUserRegister = {
                name: form.name,
                last_name: form.lastname,
                user_name: form.username,
                email: form.email,
                password: hash,
                token: form.token,
                role: "U"
            }
            const saveUser = UserRepository.save(user)
            console.log(typeof saveUser);
            
            if (typeof saveUser === "undefined") {
                return res.status(500).send('Error al registrar')
            }

            if (typeof saveUser === 'number') {
                return res.status(204).send('User exists');
            }

            return res.status(200).send(saveUser);
        })

    },


    async authenticate(req: Request, res: Response) {
        const params: FormLogin = req.body;
        const { userData } = params;
        const user: IUserLogin = {
            email: userData.email,
            password: userData.password,
        }
        const getUser = await UserRepository.get(user.email)
        if (typeof getUser === "undefined") return res.status(401).send('Incorrect login data')
        await bcrypt.compare(userData.password, getUser?.password, (error: string, result: boolean) => {
            if (error) throw error
            if (result) return res.status(200).send(getUser)
            return res.status(500).send("Something went wrong")

        })
    }
}