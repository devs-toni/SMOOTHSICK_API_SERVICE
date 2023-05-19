import { ITrack } from "../models/Track";
import { TrackModel } from "./schemas/Track";


export const TrackRepository = {
  save: async (track: ITrack) => {
    const trackExist = await TrackModel.findOne({ title: track.title });
    if (!trackExist) {
      return await TrackModel.create(track);
    }
  },

  findById: async (trackId: string) =>
  await TrackModel.findOne({ id: trackId }),

  findAll: async () => await TrackModel.find({ disk_number: { $ne: -1 } }),

  findTopFour: async (artistId: string) =>
    await TrackModel.find({
      artist_id: artistId,
      disk_number: { $ne: -1 },
    }).limit(4),

  findOwner: async () =>
    await TrackModel.find({ disk_number: -1 }).limit(50),

  findBestSong: async (artistId: string) =>
    await TrackModel.find({ artist_id: artistId, disk_number: { $ne: -1 } })
      .sort({ rank: -1 })
      .limit(1),

  findLikeById: async (playlistId: string, userId: string) =>
    await TrackModel.find({
      id: playlistId,
      likes: userId,
      disk_number: { $ne: -1 },
    }),

  findFavouritesByUserId: async (userId: string) =>
    await TrackModel.find({ likes: userId, disk_number: { $ne: -1 } }),

  findMySongs: async (userId: string) =>
    await TrackModel.find({ disk_number: -1, artist_id: userId }),

  findAlbumSongs: async (albumId: string) =>
    await TrackModel.find({ album_id: albumId }),

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

  updateById: async (trackId: string, track: ITrack) => {
    return await TrackModel.updateOne(
      { id: trackId },
      { $set: { title: track.title, title_short: track.title_short } }
    );
  },

  deleteById: async (trackId: string) =>
    await TrackModel.deleteOne({ id: trackId }),

  search: async (query: string) =>
    await TrackModel.find({
      title: { $regex: query, $options: "i" },
      disk_number: { $ne: -1 },
    }),

  deleteAll: async () => {
    const areDeleted = await TrackModel.deleteMany({});
    return areDeleted.acknowledged;
  },
};
