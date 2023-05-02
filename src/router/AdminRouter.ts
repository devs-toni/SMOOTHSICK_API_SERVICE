/* export const AdminRouter = {

} */
import { AdminController } from "../controller/AdminController";
import { Router } from "express";

export const AdminRouter = Router();

AdminRouter.get('/', AdminController.batch);
AdminRouter.get('/deezerCode', AdminController.deezerCode);