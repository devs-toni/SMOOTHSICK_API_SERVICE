import { Router } from "express";
import { UserController } from "../controller/UserController";
import { tokenChecker } from "../middlewares/tokenChecker";

export const UserRouter = Router();

UserRouter
    .post("/register", UserController.register)// Get register
    .post("/authenticate", UserController.authenticate)// Get login
    .post("/authorizate", tokenChecker, UserController.authorizate)// Get Check user rol
    .post("/userData", tokenChecker, UserController.getUserData)// Get user trow token
