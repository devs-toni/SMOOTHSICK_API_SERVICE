import { Router } from "express";
import { PlaylistController } from "../controller/PlaylistController";
import { tokenChecker } from "../middlewares/tokenChecker";

export const PlaylistRouter = Router();

PlaylistRouter.get("/", PlaylistController.getAll);
PlaylistRouter.get("/search", PlaylistController.search);
PlaylistRouter.post("/create", PlaylistController.createPlaylist)
PlaylistRouter.get("/home", PlaylistController.getAllHome);
PlaylistRouter.get("/more", PlaylistController.getMoreHome);
PlaylistRouter.patch("/like/:id", tokenChecker, PlaylistController.toggleLike);
PlaylistRouter.get("/:id", PlaylistController.getById);
PlaylistRouter.post("/newPlaylist", PlaylistController.saveUserPlaylist);
PlaylistRouter.post("/addTrack", PlaylistController.AddTrackToPlaylist)
PlaylistRouter.get("/image/:id", PlaylistController.getOwnPlaylistImage)
PlaylistRouter.patch("/removeFromPlaylist", PlaylistController.removeFromPlaylist)

