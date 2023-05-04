import { Request, Response } from "express";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";
import { ITrack } from "../models/Track";

export const TrackController = {
  getAll: async (req: Request, res: Response) => {
    const allTracks = await TrackRepository.findAll();
    return res.send(allTracks);
  },
  getAllHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findAllHome();
    let finalData: Object[] = [];
    let finalTracks: ITrack[] = [];

    await Promise.all(
      artists.map(async (artist) => {
        const track = await TrackRepository.findBestSong(artist.id);
        finalTracks.push(track[0]);
      })
    );

    await Promise.all(
      finalTracks.map(async (track) => {
        if (track?.album_id) {
          const album = await AlbumRepository.findById(track.album_id);
          if (album.length !== 0) {
            finalData.push({ track, album: album[0] });
          }
        }
      })
    );
    return res.send(finalData);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await TrackRepository.search(str);
    const finalData: Object[] = [];

    await Promise.all(
      results.map(async (track) => {
        if (track?.album_id) {
          const album = await AlbumRepository.findById(track.album_id);
          if (album.length !== 0) {
            finalData.push({ track, album: album[0] });
          }
        }
      })
    );
    return res.send(finalData);
  },
};
