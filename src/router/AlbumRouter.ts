import { Router } from "express";
import { AlbumController } from "../controller/AlbumController";

export const AlbumRouter = Router();

AlbumRouter.get("/", AlbumController.getAll);
AlbumRouter.get("/home", AlbumController.getAllHome);
AlbumRouter.get("/more", AlbumController.getMoreHome);
AlbumRouter.get("/search", AlbumController.search);
AlbumRouter.get("/top/:id", AlbumController.getTop);
AlbumRouter.get("/:id", AlbumController.getById);
AlbumRouter.get("/getAlbumSongs/:id", AlbumController.getAlbumSongs);
