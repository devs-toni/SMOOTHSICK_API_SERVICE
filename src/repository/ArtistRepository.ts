import { IArtist } from "../models/Artist";
import { ArtistModel } from "./schemas/Artist";

export const ArtistRepository = {
  save: async (artist: IArtist) => {
    //console.log(artist);
    const createdArtist = await ArtistModel.create(artist);
//    console.log(createdArtist);
  },

  deleteAll: async () => {
    const areDeleted = await ArtistModel.deleteMany({});
    return areDeleted.acknowledged;
  }
};
