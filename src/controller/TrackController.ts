import { Request, Response } from "express";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";
import { ITrackDto, ITrack } from "../models/Track";

export const TrackController = {
  getById: async (req: Request, res: Response) => {
    const id = req.params.id
    const track = await TrackRepository.findById(id);
    return res.send(track);
  },
  getAll: async (req: Request, res: Response) => {
    const allTracks = await TrackRepository.findAll();
    return res.send(allTracks);
  },
  getAllHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findAllHome();
    let finalData: ITrackDto[] = [];
    let finalTracks: ITrack[] = [];

    await Promise.all(
      artists.map(async (artist) => {
        const track = await TrackRepository.findBestSong(artist.id);
        if (typeof track[0] !== "undefined") finalTracks.push(track[0]);
      })
    );

    await Promise.all(
      finalTracks.map(
        async ({
          id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        }
      )
    );
    return res.send(finalData);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findMoreHome();
    let finalData: ITrackDto[] = [];
    let finalTracks: ITrack[] = [];

    await Promise.all(
      artists.map(async (artist) => {
        const track = await TrackRepository.findBestSong(artist.id);
        if (typeof (track[0]) !== 'undefined') finalTracks.push(track[0]);
      })
    );

    await Promise.all(
      finalTracks.map(
        async ({
          id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        }
      )
    );
    return res.send(finalData);
  },

  getTop: async (req: Request, res: Response) => {
    const id = req.params.id;
    let finalData: ITrackDto[] = [];
    const tracks = await TrackRepository.findTopFour(id);
    await Promise.all(
      tracks.map(
        async ({
          id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        }
      )
    );
    return res.send(finalData);
  },

  toggleLike: async (req: Request, res: Response) => {
    const trackId = req.params.id;
    const userId = res.locals.user.id;
    const isLike = await TrackRepository.findLikeById(trackId, userId);
    let result;

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
    const finalData: ITrackDto[] = [];

    await Promise.all(
      results.map(
        async ({
          id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        }
      )
    );
    return res.send(finalData);
  },
};
