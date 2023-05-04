import { Router } from "express";
import { ArtistController } from "../controller/ArtistController";

export const ArtistRouter = Router();

ArtistRouter.get("/", ArtistController.getAll);
ArtistRouter.get("/:id", ArtistController.getById);
ArtistRouter.get("/home", ArtistController.getAllHome);