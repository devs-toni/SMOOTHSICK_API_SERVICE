import { Request, Response } from "express";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";
import { TrackRepository } from "../repository/TrackRepository";
import { IAlbumDto } from "../models/Album";

export const AlbumController = {
  getById: async (req: Request, res: Response) => {
    const _id = req.params.id;    
    const album_result = await AlbumRepository.findById(_id);    
    const album = album_result[0]
    
    const artist = await ArtistRepository.findById(album.artist_id);

    const albumDto: IAlbumDto = {
      _id: album._id,
      Id: album.Id,
      title: album.title,
      label: album.label,
      upc: album.upc,
      cover: album.cover,
      nb_tracks: album.nb_tracks,
      duration: album.duration,
      fans: album.fans,
      release_date: album.release_date,
      artist_id: album.artist_id,
      artist_picture: artist[0].picture,
      artist_name: artist[0].name,
    };

    return res.send(albumDto);
  },

  getAll: async (req: Request, res: Response) => {
    const allAlbums = await AlbumRepository.findAll();
    const finalData: unknown[] = [];
    await Promise.all(
      allAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      }),
    );
    return res.send(finalData);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findAllHome();
    const finalData: unknown[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      }),
    );    
    return res.send(finalData);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findMoreHome();
    const finalData: unknown[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      }),
    );
    return res.send(finalData);
  },

  getTop: async (req: Request, res: Response) => {
    const id = req.params.id;
    const homeAlbums = await AlbumRepository.findTop(id);
    const finalData: unknown[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      }),
    );
    return res.send(finalData);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await AlbumRepository.search(str);
    const finalData: unknown[] = [];
    await Promise.all(
      results.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        if (artist.length > 0) finalData.push({ album, artist: artist[0] });
      }),
    );
    return res.send(finalData);
  },

  getAlbumSongs: async (req: Request, res: Response) => {
    const id = req.params.id;
    const tracks = await TrackRepository.findAlbumSongs(id);
    const newArr: unknown[] = [];
    await Promise.all(
      tracks.map(async (track) => {
        const artist = await ArtistRepository.findById(track.artist_id!);
        const album = await AlbumRepository.findById(track.album_id!);
        const trackDto = {
          id: track._id,
          Id: track.Id,
          readable: track.readable,
          title: track.title,
          title_short: track.title_short,
          duration: track.duration,
          track_position: track.track_position,
          disk_number: 1,
          rank: track.rank,
          preview: track.preview,
          artist_id: track.artist_id,
          album_id: track.album_id,
          artist_name: artist[0]?.name,
          label: album[0].label,
          likes: track.likes,
        };
        newArr.push(trackDto);
      }),
    );
    return res.send(newArr);
  },
};
