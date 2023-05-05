import { Request, Response } from "express";
import { ArtistRepository } from "../repository/ArtistRepository";

export const ArtistController = {
  getAll: async (req: Request, res: Response) => {
    const allArtists = await ArtistRepository.findAll();
    return res.send(allArtists);
  },

  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const artist = await ArtistRepository.findById(id);
    return res.send(artist[0]);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeArtists = await ArtistRepository.findAllHome();
    return res.send(homeArtists);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const homeArtists = await ArtistRepository.findMoreHome();
    return res.send(homeArtists);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await ArtistRepository.search(str);
    return res.send(results);
  },
};
