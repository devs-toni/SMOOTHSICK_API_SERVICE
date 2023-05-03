import { AdminController } from "../controller/AdminController";
import { Router } from "express";

export const AdminRouter = Router();

AdminRouter.get('/reload', AdminController.reload);