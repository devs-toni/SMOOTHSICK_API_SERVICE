import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";

export const TrackRepository = {
  save: async (track: ITrack) => {
    const trackExist = await TrackModel.findOne({ id: track.id });
    if (!trackExist) {
      return await TrackModel.create(track);
    }
  },

  findAll: async () => await TrackModel.find({}),

/*   findAllHome: async () =>
    await TrackModel.find({ artist_id: { $exists: true } })
      .sort({ rank: -1 })
      .limit(13), */

/*   findMoreHome: async () =>
    await TrackModel.find({ artist_id: { $exists: true } })
      .sort({ rank: 1 })
      .limit(13), */
  findTopFour: async (artistId: string) => 
    await TrackModel.find({ artist_id: artistId }).limit(4),

  findBestSong: async (artistId: string) =>
    await TrackModel.find({ artist_id: artistId }).sort({ rank: -1 }).limit(1),

  search: async (query: string) =>
    await TrackModel.find({ title: { $regex: query, $options: "i" } }),

  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
