import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    const createdArtist = await ArtistModel.create(artist);
  },

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  }
};
