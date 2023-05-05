import { IPlaylist } from "../models/Playlist";
import { PlaylistModel } from "./schemas/Playlist";

export const PlaylistRepository = {
  save: async (playlist: IPlaylist) => {
    const playlistExists = await PlaylistModel.findOne({ id: playlist.id });
    if (!playlistExists) {
      return await PlaylistModel.create(playlist);
    }
  },

  findById: async (id: string) => await PlaylistModel.find({ id: id }),

  findAll: async () => await PlaylistModel.find({}),

  findAllHome: async () =>
    await PlaylistModel.find({}).sort({ fans: -1 }).limit(13),

  findMoreHome: async () =>
    await PlaylistModel.find({}).sort({ fans: 1 }).limit(13),

  search: async (query: string) =>
    await PlaylistModel.find({ title: { $regex: query, $options: "i" } }),

  deleteAll: async () => {
    const areDeleted = await PlaylistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
