import { Request, Response } from 'express';
import { PlaylistRepository } from '../repository/PlaylistRepository';

export const PlaylistController = {

  getAll: async(req: Request, res: Response) => {
    const allPlaylists = await PlaylistRepository.findAll();
    return res.send(allPlaylists);
  },

  getAllHome: async(req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findAllHome();
    return res.send(homePlaylists);
  }
};
