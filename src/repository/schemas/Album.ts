import { Schema, model } from "mongoose";

const AlbumSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    Id: { type: String, required: true },
    title: { type: String, required: true },
    label: { type: String, required: true },
    upc: { type: String, required: true },
    cover: { type: String, required: true },
    nb_tracks: { type: Number, required: true },
    duration: { type: Number, required: true },
    fans: { type: Number, required: true },
    release_date: { type: Date, required: true },
    artist_id: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AlbumModel = model("Album", AlbumSchema);
