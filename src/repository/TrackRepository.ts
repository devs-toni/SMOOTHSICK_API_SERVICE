import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";

export const TrackRepository = {
  save: async (track: ITrack) => {
    const trackExist = await TrackModel.findOne({ id: track.id });
    if (!trackExist) {
      return await TrackModel.create(track);
    }
  },
  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
