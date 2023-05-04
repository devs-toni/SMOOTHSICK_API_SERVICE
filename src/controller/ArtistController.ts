import { Request, Response } from "express";
import { ArtistRepository } from "../repository/ArtistRepository";

export const ArtistController = {
  getAll: async (req: Request, res: Response) => {
    const allArtists = await ArtistRepository.findAll();
    res.send(allArtists);
  },

  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const artist = await ArtistRepository.findById(id);
    res.send(artist);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeArtists = await ArtistRepository.findAllHome();
    res.send(homeArtists);
  },
};
