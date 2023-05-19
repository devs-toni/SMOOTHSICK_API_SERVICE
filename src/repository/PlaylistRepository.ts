import { IPlaylist } from "../models/Playlist";
import { PlaylistModel } from "./schemas/Playlist";

export const PlaylistRepository = {
  save: async (playlist: IPlaylist) => {
    const playlistExists = await PlaylistModel.findOne({ id: playlist.id });
    if (!playlistExists) {
      return await PlaylistModel.create(playlist);
    }
  },

  saveUserPlaylist: async (playlist: IPlaylist) => {
    try {
      const playlistExists = await PlaylistModel.findOne({
        id: playlist.creator_id,
      });
      if (!playlistExists) {
        return await PlaylistModel.create(playlist);
      }
    } catch (err) {
      console.error(err);
    }
  },

  FindByIdAndDelete: async (id: string) => {
    const deletePlaylist = await PlaylistModel.deleteOne({ id });
    if (deletePlaylist) return deletePlaylist;
    return undefined;
  },

  addToPlaylist: async (userPlaylist: Object, trackId: string) => {
    const trackAdded = await PlaylistModel.updateOne(userPlaylist, {
      $push: { tracklist: trackId },
    });
    if (trackAdded) return trackAdded;
    return undefined;
  },

  findOne: async (id: string) => await PlaylistModel.find({ tracklist: id }),

  findById: async (id: string) => await PlaylistModel.find({ id: id }),

  findByCreatorId: async (id: string) =>
    await PlaylistModel.find({ creator_id: id }),

  findAll: async () => await PlaylistModel.find({}),

  findAllHome: async () =>
    await PlaylistModel.find({}).sort({ fans: -1 }).limit(50),

  findMoreHome: async () =>
    await PlaylistModel.find({}).sort({ fans: 1 }).limit(50),

  findLikeById: async (playlistId: string, userId: string) =>
    await PlaylistModel.find({ id: playlistId, likes: userId }),

  toggleLike: async (playlistId: string, userId: string, operation: string) => {
    if (operation === "+") {
      return await PlaylistModel.updateOne(
        { id: playlistId },
        { $push: { likes: userId } }
      );
    } else if (operation === "-") {
      return await PlaylistModel.updateOne(
        { id: playlistId },
        { $pull: { likes: userId } }
      );
    }
  },

  search: async (query: string) =>
    await PlaylistModel.find({ title: { $regex: query, $options: "i" } }),

  removeFromPlaylist: async (playlistId: string, trackId: string) => {
    try {
      const trackRemoved = await PlaylistModel.updateOne(
        { id: playlistId },
        { $pull: { tracklist: trackId } }
      );
      return trackRemoved;
    } catch (error) {
      console.log(error);
    }
  },

  deleteAll: async () => {
    const areDeleted = await PlaylistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
