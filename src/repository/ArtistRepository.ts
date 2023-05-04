import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    const artistExist = await ArtistModel.findOne({ id: artist.id });
    if (!artistExist) {
      return await ArtistModel.create(artist);
    }
  },

  findAll: async () => await ArtistModel.find({}),

  findAllHome: async () => await ArtistModel.find({}).limit(13),

  findById: async (id: string) => await ArtistModel.find({ id: id }),

  search: async (query: string) =>
    await ArtistModel.find({ name: { $regex: query, $options: "i" } }),

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
