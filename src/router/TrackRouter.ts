import { Router } from "express";
import { TrackController } from "../controller/TrackController";
import { tokenChecker } from "../middlewares/tokenChecker";

export const TrackRouter = Router();

TrackRouter.get("/", TrackController.getAll);
TrackRouter.get("/home", TrackController.getAllHome);
TrackRouter.get("/more", TrackController.getMoreHome);
TrackRouter.get("/search", TrackController.search);
TrackRouter.patch("/like/:id", tokenChecker, TrackController.addLike)
TrackRouter.get("/top/:id", TrackController.getTop);
