import e, { Request, Response } from "express";
import { PlaylistRepository } from "../repository/PlaylistRepository";
import { IUserPlaylist } from "../models/Playlist";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";


export const PlaylistController = {

  createPlaylist: async (req: Request, res: Response) => {
    const { body } = req
    try {
      const newPlaylist = await PlaylistRepository.save({
        ...body
      });
      res.status(201).send({
        status: true,
        msg: "You have a new playlist",
        data: newPlaylist,
      })
    } catch (error) {
      res.status(500).send({
        status: false,
        msg: error,
      })
    }
  },

  AddTrackToPlaylist: async (req: Request, res: Response) => {
    const { trackId, listId } = req.body
    const userPlaylist = await PlaylistRepository.findById(listId)
    if (userPlaylist) {
      const trackAdded = await PlaylistRepository.addToPlaylist(userPlaylist[0], trackId)
      if (trackAdded) {
        res.status(201).send(userPlaylist)
      }
    } else {
      res.status(404).send("Playlist not found")
    }
  },

  getPlaylistTracks: async (req: Request, res: Response) => {
    const { tracklist } = req.body
    let finalData: Object[] = []
    if (tracklist) {
      await Promise.all(
        tracklist.map(async (trackId: any) => {
          const track: any = await TrackRepository.findById(trackId)
          finalData.push(track)
        })
      )
      res.status(201).send(finalData)
    }
  },



  UserPlaylist: async (req: Request, res: Response) => {
    const { title, user_id, playlist_id } = req.body
    const playlist = {
      id: playlist_id,
      title: title,
      description: "",
      duration: 300,
      nb_tracks: 10,
      picture: "picture",
      fans: 0,
      tracklist: [],
      creator_id: user_id
    }
    try {
      const newPlaylist = await PlaylistRepository.saveUserPlaylist(playlist);
      res.status(201).send(newPlaylist)
    } catch (error) {
      res.status(500).send("Something went wrong")
    }
  },






  getAll: async (req: Request, res: Response) => {
    const allPlaylists = await PlaylistRepository.findAll();
    return res.send(allPlaylists);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findAllHome();
    return res.send(homePlaylists);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const homePlaylists = await PlaylistRepository.findMoreHome();
    return res.send(homePlaylists);
  },

  toggleLike: async (req: Request, res: Response) => {
    const playlistId = req.params.id;
    const userId = res.locals.user.id;
    const isLike = await PlaylistRepository.findLikeById(playlistId, userId);
    let result;

    if (isLike.length > 0) {
      result = await PlaylistRepository.toggleLike(playlistId, userId, "-");
    } else {
      result = await PlaylistRepository.toggleLike(playlistId, userId, "+");
    }
    if (result?.acknowledged) res.send();
    else res.status(500).send();
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await PlaylistRepository.search(str);
    return res.send(results);
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const playlist = await PlaylistRepository.findById(id);
    return res.send(playlist[0]);
  },
};
