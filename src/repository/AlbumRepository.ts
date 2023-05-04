import { IAlbum } from "../models/Album";
import { AlbumModel } from "./schemas/Album";

export const AlbumRepository = {
  save: async (album: IAlbum) => {
    const albumExists = await AlbumModel.findOne({ id: album.id });
    if (!albumExists) {
      return await AlbumModel.create(album);
    }
  },

  findById: async (id: string) => await AlbumModel.find({ id: id }),

  findAll: async () => await AlbumModel.find({}),

  findAllHome: async () => await AlbumModel.find({}).limit(13),

  search: async (query: string) => {
    return await AlbumModel.find({ title: { $regex: query, $options: "i" } });
  },

  deleteAll: async () => {
    const areDeleted = await AlbumModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
