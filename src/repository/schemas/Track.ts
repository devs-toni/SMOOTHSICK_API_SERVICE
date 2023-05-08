import { Schema, model } from "mongoose";
import { ITrack } from "../../models/Track";

const TrackSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    readable: { type: Boolean, required: true },
    title: { type: String, required: true },
    title_short: { type: String, required: true },
    duration: { type: Number, required: true },
    track_position: { type: Number, required: false },
    disk_number: { type: Number, required: false },
    rank: { type: Number, required: true },
    preview: { type: String, required: false },
    artist_id: { type: String, required: false },
    album_id: { type: String, required: false },
    likes: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
  }
);

export const TrackModel = model<ITrack>("Track", TrackSchema);
