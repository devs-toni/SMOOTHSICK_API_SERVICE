import { Router } from "express";
import { PlaylistController } from "../controller/PlaylistController";

export const PlaylistRouter = Router();

PlaylistRouter.get("/", PlaylistController.getAll);
PlaylistRouter.get("/home", PlaylistController.getAllHome);
PlaylistRouter.get("/less", PlaylistController.getAllLess);
PlaylistRouter.get("/search", PlaylistController.search);
PlaylistRouter.get("/:id",PlaylistController.getById);

