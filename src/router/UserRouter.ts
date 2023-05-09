import { Router } from "express";
import { UserController } from "../controller/UserController";
import { tokenChecker } from "../middlewares/tokenChecker";
import { ForgotPassword } from "../controller/ForgotPasswordController";
import { ResetPassword } from "../controller/ResetPassController";

export const UserRouter = Router();

UserRouter
    .get("/", UserController.getAll)
    .get("/favourites", tokenChecker ,UserController.getFavourites)
    .post("/register", UserController.register)// Get register
    .post("/authenticate", UserController.authenticate)// Get login
    .post("/authorizate", tokenChecker, UserController.authorizate)// Get Check user rol
    .post("/userData", tokenChecker, UserController.getUserData)// Get user trow token
    .post("/forgotPassword", ForgotPassword.getUserData)// Get user trow email
    .patch("/resetPassword", ResetPassword.reset)// Update new password of user
    .post("/validatePassword", UserController.validatePass)// Validate password of user
    .patch("/changePassword", UserController.changePass)// Change password of user
    .patch("/changeUserName", UserController.changeUserName)// Change user name
    .patch("/changeUserEmail", UserController.changeUserEmail)// Change user email
    .delete("/deleteUser/:id", UserController.deleteUser)// Delete user account

    