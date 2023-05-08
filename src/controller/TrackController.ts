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

  getMoreHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findMoreHome();
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

  getTop: async (req: Request, res: Response) => {
    const id = req.params.id;
    let finalData: Object[] = [];
    const tracks = await TrackRepository.findTopFour(id);

    await Promise.all(
      tracks.map(async (track) => {
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

  addLike: async (req: Request, res: Response) => {
    const trackId = req.params.id;
    const userId = res.locals.user.id;
    const isLike = await TrackRepository.findLikeById(trackId, userId);
    let result;
    console.log(isLike);
    if (isLike.length > 0) {
      result = await TrackRepository.toggleLike(trackId, userId, "-");
    } else {
      result = await TrackRepository.toggleLike(trackId, userId, "+");
    }
    if (result?.acknowledged) res.send();
    else res.status(500).send();
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
