import { Schema, model } from "mongoose";

const ArtistSchema: Schema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    nb_album: { type: Number, required: true },
    nb_fan: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const ArtistModel = model("Artist", ArtistSchema);
