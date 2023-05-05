import { Router } from "express";
import { AlbumController } from "../controller/AlbumController";

export const AlbumRouter = Router();

AlbumRouter.get('/', AlbumController.getAll); 
AlbumRouter.get('/home', AlbumController.getAllHome);
AlbumRouter.get('/more', AlbumController.getMoreHome);
AlbumRouter.get('/search', AlbumController.search);
AlbumRouter.get('/:id', AlbumController.getById);
