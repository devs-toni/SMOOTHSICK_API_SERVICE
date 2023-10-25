import { Router } from "express";
import { ArtistController } from "../controller/ArtistController";

export const ArtistRouter = Router();

ArtistRouter.get("/", ArtistController.getAll);
ArtistRouter.get("/home", ArtistController.getAllHome);
ArtistRouter.get("/more", ArtistController.getMoreHome);
ArtistRouter.get("/search", ArtistController.search);
ArtistRouter.get("/:id", ArtistController.getById);
