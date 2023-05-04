import { Request, Response } from "express";
import { TrackRepository } from "../repository/TrackRepository";
import { ArtistRepository } from "../repository/ArtistRepository";

export const TrackController = {
  getAll: async (req: Request, res: Response) => {
    const allTracks = await TrackRepository.findAll();
    return res.send(allTracks);
  },
  getAllHome: async (req: Request, res: Response) => {
    const homeTracks = await TrackRepository.findAllHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeTracks.map(async (track) => {
        const artist = await ArtistRepository.findById(track.artist_id);
        if (artist.length !== 0) {
          finalData.push({ track, artist: artist[0] });
        }
      })
    );
    return res.send(finalData);
  },
};
