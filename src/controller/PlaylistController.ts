import { Request, Response } from 'express';
import { PlaylistRepository } from '../repository/PlaylistRepository';

export const PlaylistController = {

  getAll: async(req: Request, res: Response) => {
    const allPlaylists = await PlaylistRepository.findAll();
    res.send(allPlaylists);
  },

  getAllHome: async(req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findAllHome();
    res.send(homePlaylists);
  }
};
