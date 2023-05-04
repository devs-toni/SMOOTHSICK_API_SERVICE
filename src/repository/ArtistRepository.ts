import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    const artistExist = await ArtistModel.findOne({ id: artist.id });
    if (!artistExist) {
      return await ArtistModel.create(artist);
    }
  },

  findAll: async () => await ArtistModel.find({}).sort({ name: -1 }),

  findAllHome: async () =>
    await ArtistModel.find({}).sort({ nb_fan: -1 }).limit(13),

  findMoreHome: async () =>
    await ArtistModel.find({}).sort({ nb_fan: 1 }).limit(13),

  findById: async (id: string) => await ArtistModel.find({ id: id }),

  search: async (query: string) =>
    await ArtistModel.find({ name: { $regex: query, $options: "i" } }),

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
