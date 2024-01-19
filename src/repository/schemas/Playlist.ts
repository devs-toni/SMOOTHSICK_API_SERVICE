import { Schema, model } from "mongoose";

const PlaylistSchema: Schema = new Schema(
  {
    Id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    duration: { type: Number, required: true },
    nb_tracks: { type: Number, required: true },
    picture: { type: String, required: false },
    fans: { type: Number, required: true },
    tracklist: { type: Array, required: true },
    creator_id: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const PlaylistModel = model("Playlist", PlaylistSchema);
