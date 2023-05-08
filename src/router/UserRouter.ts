import { Router } from "express";
import { UserController } from "../controller/UserController";
import { tokenChecker } from "../middlewares/tokenChecker";
import { ForgotPassword } from "../controller/ForgotPasswordController";
import { ResetPassword } from "../controller/ResetPassController";

export const UserRouter = Router();

UserRouter
    .post("/register", UserController.register)// Get register
    .post("/authenticate", UserController.authenticate)// Get login
    .post("/authorizate", tokenChecker, UserController.authorizate)// Get Check user rol
    .post("/userData", tokenChecker, UserController.getUserData)// Get user trow token
    .post("/forgotPassword", ForgotPassword.getUserData)// Get user trow email
    .patch("/resetPassword", ResetPassword.reset)// Update new password of user
    