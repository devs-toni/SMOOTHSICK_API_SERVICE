import { IAlbum } from "../models/Album";
import { AlbumModel } from "./schemas/Album";

export const AlbumRepository = {
  save: async (album: IAlbum) => {
    const albumExists = await AlbumModel.findOne({ id: album.id });
    if (!albumExists) {
      return await AlbumModel.create(album);
    }
  },
  deleteAll: async () => {
    const areDeleted = await AlbumModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
