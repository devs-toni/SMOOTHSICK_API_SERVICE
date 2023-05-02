import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";

export const TrackRepository = {
  save: async (track: ITrack) => {
    const createdTrack = TrackModel.create(track);
  },
  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
