import { Request, Response } from "express";
import { PlaylistRepository } from "../repository/PlaylistRepository";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";

export const PlaylistController = {
  createPlaylist: async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const newPlaylist = await PlaylistRepository.save({
        ...body,
      });
      res.status(201).send({
        status: true,
        msg: "You have a new playlist",
        data: newPlaylist,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        msg: error,
      });
    }
  },

  AddTrackToPlaylist: async (req: Request, res: Response) => {
    const { trackId, listId } = req.body;
    const userPlaylist = await PlaylistRepository.findById(listId);
    if (userPlaylist) {
      const trackAdded = await PlaylistRepository.addToPlaylist(
        userPlaylist[0],
        trackId
      );
      if (trackAdded) {
        res.status(201).send(userPlaylist);
      }
    } else {
      res.status(404).send("Playlist not found");
    }
  },

  getOwnPlaylistImage: async (req: Request, res: Response) => {
    const playlistId = req.params.id;
    const playlist = await PlaylistRepository.findById(playlistId);

    if (typeof playlist[0] === 'undefined') {
      return res.status(204).send("Empty tracklist")
    }
    const tracks = playlist[0].tracklist;
    let idTrackChoosed = "";
    await Promise.all(
      tracks.map(async (track: string) => {
        const tempTrack = await TrackRepository.findById(track);
        if (tempTrack?.album_id && idTrackChoosed.length === 0) idTrackChoosed = track;
      })
    );
    const tempTrack = await TrackRepository.findById(idTrackChoosed);
    if (tempTrack?.album_id) {
      const album = await AlbumRepository.findById(tempTrack?.album_id);
      return res.send(album[0].cover);
    }
    else if (!tempTrack) {
      return res.status(204).send();
    }
    return res.status(404).send("Something went wrong")
  },

  removeFromPlaylist: async (req: Request, res: Response) => {
    const { trackId, playlistId } = req.body;
    try {
      const trackRemoved = await PlaylistRepository.removeFromPlaylist(playlistId, trackId);
      if (trackRemoved?.acknowledged) {
        res.status(201).send('Removed successfully');
      }
    } catch (error) {
      res.status(404).send("Playlist not found");
    }

  },





  saveUserPlaylist: async (req: Request, res: Response) => {
    const { title, user_id, playlist_id } = req.body;
    const playlist = {
      id: playlist_id,
      title: title,
      description: "",
      duration: 300,
      nb_tracks: 10,
      fans: 0,
      tracklist: [],
      creator_id: user_id,
    };
    try {
      const newPlaylist = await PlaylistRepository.saveUserPlaylist(playlist);
      res.status(201).send(newPlaylist);
    } catch (error) {
      res.status(500).send("Something went wrong");
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
    await Promise.all(
      homePlaylists.map(async (playlist) => {
        if (!playlist.picture) {
          const tracks = playlist.tracklist;
          let idTrackChoosed = "";
          await Promise.all(
            tracks.map(async (track: string) => {
              const tempTrack = await TrackRepository.findById(track);
              if (tempTrack?.album_id && idTrackChoosed.length === 0) idTrackChoosed = track;
            })
          );
          const tempTrack = await TrackRepository.findById(idTrackChoosed);
          if (tempTrack?.album_id) {
            const album = await AlbumRepository.findById(tempTrack?.album_id);
            playlist.picture = album[0]?.cover ? album[0].cover : "";
            return playlist;
          }
        }
      })
    )



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
