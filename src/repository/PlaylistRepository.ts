import { IPlaylist } from "../models/Playlist";
import { PlaylistModel } from "./schemas/Playlist";

export const PlaylistRepository = {
  save: async (playlist: IPlaylist) => {
    const createdPlaylist = await PlaylistModel.create(playlist);
  },
  deleteAll: async () => {
    const areDeleted = await PlaylistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
