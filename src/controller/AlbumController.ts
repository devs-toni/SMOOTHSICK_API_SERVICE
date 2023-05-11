import { Request, Response } from "express";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";
import { TrackRepository } from "../repository/TrackRepository";
import { ITrackDto } from "../models/Track";

export const AlbumController = {
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const album = await AlbumRepository.findById(id);

    return res.send(album[0]);
  },

  getAll: async (req: Request, res: Response) => {
    const allAlbums = await AlbumRepository.findAll();
    let finalData: Object[] = [];
    await Promise.all(
      allAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findAllHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    // console.log(finalData);
    return res.send(finalData);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findMoreHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  getTop: async (req: Request, res: Response) => {
    const id = req.params.id;
    const homeAlbums = await AlbumRepository.findTop(id);
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await AlbumRepository.search(str);
    let finalData: Object[] = [];
    await Promise.all(
      results.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        if (artist.length > 0) finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  getAlbumSongs: async (req: Request, res: Response) => {
    const id = req.params.id;
    const tracks = await TrackRepository.findAlbumSongs(id);
    const newArr: Object[] = []
    
   await Promise.all(tracks.map(async (track) => {
      const artist = await ArtistRepository.findById(track.artist_id!)
      const trackDto = {
        _id: track._id,
        id: track.id,
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
        artist_name: artist[0].name,
      }
      newArr.push(trackDto)
      
    }))
    
    return res.send(newArr);


  }


};
