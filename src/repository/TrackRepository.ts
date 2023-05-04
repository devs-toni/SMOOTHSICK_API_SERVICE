import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";

export const TrackRepository = {
  save: async (track: ITrack) => {
    const trackExist = await TrackModel.findOne({ id: track.id });
    if (!trackExist) {
      return await TrackModel.create(track);
    }
  },

  findAll: async () => {
    return await TrackModel.find({});
  },

  findAllHome: async () => {
    return await TrackModel.find({}).limit(16);
  },

  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
