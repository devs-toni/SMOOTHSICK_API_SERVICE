import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    const artistExist = await ArtistModel.findOne({ id: artist.id });
    if (!artistExist) {
      return await ArtistModel.create(artist);
    }
  },

  findAll: async () => {
    return await ArtistModel.find({});
  },

  findAllHome: async () => {
    return await ArtistModel.find({}).limit(14);
  },

  findById: async (id: string) => {
    return await ArtistModel.find({ id: id });
  },

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
