import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    const artistExist = await ArtistModel.findOne({ id: artist.id });
    if (!artistExist) {
      return await ArtistModel.create(artist);
    }
  },

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
