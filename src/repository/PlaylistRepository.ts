import { IPlaylist } from "../models/Playlist";
import { PlaylistModel } from "./schemas/Playlist";

export const PlaylistRepository = {
  save: async (playlist: IPlaylist) => {
    const playlistExists = await PlaylistModel.findOne({ id: playlist.id });
    if (!playlistExists) {
      return await PlaylistModel.create(playlist);
    }
  },

  findAll: async () => {
    return await PlaylistModel.find({});
  },

  findAllHome: async () => {
    return await PlaylistModel.find({}).limit(14);
  },

  deleteAll: async () => {
    const areDeleted = await PlaylistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
