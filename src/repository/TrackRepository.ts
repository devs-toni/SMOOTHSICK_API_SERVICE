import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";


export const TrackRepository = {
  save: async (track: ITrack) => {
    const trackExist = await TrackModel.findOne({ id: track.id });
    if (!trackExist) {
      return await TrackModel.create(track);
    }
  },

  findById: async (trackId: string) => await TrackModel.findOne({id: trackId}),

  findAll: async () => await TrackModel.find({}),

  findTopFour: async (artistId: string) =>
    await TrackModel.find({ artist_id: artistId }).limit(4),

  findBestSong: async (artistId: string) =>
    await TrackModel.find({ artist_id: artistId }).sort({ rank: -1 }).limit(1),

  findLikeById: async (playlistId: string, userId: string) =>
    await TrackModel.find({ id: playlistId, likes: userId }),

  findFavouritesByUserId: async (userId: string) =>
    await TrackModel.find({ likes: userId }),

  toggleLike: async (trackId: string, userId: string, operation: string) => {
    if (operation === "+") {
      return await TrackModel.updateOne(
        { id: trackId },
        { $push: { likes: userId } }
      );
    } else if (operation === "-") {
      return await TrackModel.updateOne(
        { id: trackId },
        { $pull: { likes: userId } }
      );
    }
  },

  search: async (query: string) =>
    await TrackModel.find({ title: { $regex: query, $options: "i" } }),

  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
