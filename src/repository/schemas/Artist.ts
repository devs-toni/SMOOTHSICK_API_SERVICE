import { Schema, model } from "mongoose";

const ArtistSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    Id: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    nb_album: { type: Number, required: true },
    nb_fan: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const ArtistModel = model("Artist", ArtistSchema);
