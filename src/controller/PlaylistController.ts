import { Request, Response } from "express";
import { PlaylistRepository } from "../repository/PlaylistRepository";

export const PlaylistController = {
  createPlaylist : async  (req: Request, res: Response)=> {
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
