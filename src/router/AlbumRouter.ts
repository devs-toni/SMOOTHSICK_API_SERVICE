import { Router } from "express";
import { AlbumController } from "../controller/AlbumController";

export const AlbumRouter = Router();

AlbumRouter.get('/', AlbumController.getAll); 
AlbumRouter.get('/home', AlbumController.getAllHome);
