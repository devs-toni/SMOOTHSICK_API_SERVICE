import { Router } from "express";
import { UserController } from "../controller/UserController";

export const UserRouter = Router();

UserRouter
    .post("/register", UserController.register)//register
    .post("/authenticate", UserController.authenticate)//login
