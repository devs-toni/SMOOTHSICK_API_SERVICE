import { Response, Router } from "express";
import { TrackController } from "../controller/TrackController";
import { tokenChecker } from "../middlewares/tokenChecker";

export const TrackRouter = Router();

TrackRouter.get("/", TrackController.getAll);
TrackRouter.get("/search", TrackController.search);
TrackRouter.post("/", tokenChecker, TrackController.save);
TrackRouter.put("/:id", tokenChecker, TrackController.update)
TrackRouter.post("/uploadImage", tokenChecker, TrackController.uploadImage);
TrackRouter.post("/uploadAudio", tokenChecker, TrackController.uploadAudio);
TrackRouter.get("/home", TrackController.getAllHome);
TrackRouter.get("/more", TrackController.getMoreHome);
TrackRouter.get("/owner", TrackController.getOwnerHome);
TrackRouter.patch("/like/:id", tokenChecker, TrackController.toggleLike);
TrackRouter.get("/top/:id", TrackController.getTop);
TrackRouter.get("/my", tokenChecker, TrackController.getMySongs);
TrackRouter.delete("/:id", tokenChecker, TrackController.deleteSong);
TrackRouter.get("/:id", TrackController.getById);
TrackRouter.get("/image/:id", TrackController.getWithImageById);
