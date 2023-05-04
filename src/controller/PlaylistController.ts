import { Request, Response } from "express";
import { PlaylistRepository } from "../repository/PlaylistRepository";

export const PlaylistController = {
  getAll: async (req: Request, res: Response) => {
    const allPlaylists = await PlaylistRepository.findAll();
    return res.send(allPlaylists);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findAllHome();
    return res.send(homePlaylists);
  },

  getAllLess: async (req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findAllLess();
    return res.send(homePlaylists);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await PlaylistRepository.search(str);
    return res.send(results);
  },
};
