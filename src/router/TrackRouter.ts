import { Router } from "express";
import { TrackController } from "../controller/TrackController";

export const TrackRouter = Router();

TrackRouter.get("/", TrackController.getAll)
TrackRouter.get("/home", TrackController.getAllHome)
TrackRouter.get("/more", TrackController.getMoreHome)
TrackRouter.get("/search", TrackController.search);