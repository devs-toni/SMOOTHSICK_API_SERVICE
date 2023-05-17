import { IAlbum } from "../models/Album";
import { AlbumModel } from "./schemas/Album";

export const AlbumRepository = {
  save: async (album: IAlbum) => {
    const albumExists = await AlbumModel.findOne({ id: album.id });
    if (!albumExists) {
      return await AlbumModel.create(album);
    }
  },

  findTop: async (artistId: string) =>
    await AlbumModel.find({ artist_id: artistId })
      .sort({ fans: -1 })
      .limit(10),

  findById: async (id: string) => await AlbumModel.find({ id: id }),

  findAll: async () => await AlbumModel.find({}).sort({ title: 1 }),

  findAllHome: async () =>
    await AlbumModel.find({}).sort({ fans: -1 }).limit(50),

  findMoreHome: async () =>
    await AlbumModel.find({}).sort({ fans: 1 }).limit(50),

  search: async (query: string) => {
    return await AlbumModel.find({ title: { $regex: query, $options: "i" } });
  },

  deleteAll: async () => {
    const areDeleted = await AlbumModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
