import { Request, Response } from "express";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";

export const AlbumController = {
  
  getAll: async (req: Request, res: Response) => {
    const allAlbums = await AlbumRepository.findAll();
    return res.send(allAlbums);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findAllHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },
  
};
