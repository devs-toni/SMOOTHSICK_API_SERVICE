import fs from "fs"
import config from "../config/config";
import { AlbumModel } from "../repository/schemas/Album";
import { ArtistModel } from "../repository/schemas/Artist";
import { PlaylistModel } from "../repository/schemas/Playlist";
import { UserGoogleModel } from "../repository/schemas/UserGoogle";
import { TrackModel } from "../repository/schemas/Track";
import { IGetGoogleUserData, IGetUserData } from "../models/User";
import { UserModel } from "../repository/schemas/User";
import { IPlaylist } from "../models/Playlist";
import { IArtist } from "../models/Artist";
import { IAlbum } from "../models/Album";
import { ITrack } from "../models/Track";

const loadData = async (entity: string) => {
  const datos = JSON.parse(fs.readFileSync(config.app.MIGRATIONS_URI + '.' + entity + '.json', 'utf-8'));

  switch (entity) {
    case "albums":
      datos.forEach(async (element: IAlbum) => {
        const existingAlbum = await AlbumModel.findOne({ Id: element.Id });

        if (existingAlbum)
          return;
        else {
          const newAlbum = await AlbumModel.create(element)
          if (!newAlbum)
            return;
        }
      });
      console.log("--- Albums loaded successfully ---");
      
      break;
    case "artists":
      datos.forEach(async (element: IArtist) => {
        const existingArtist = await ArtistModel.findOne({ Id: element.Id });

        if (existingArtist)
          return;
        else {
          const newArtist = await ArtistModel.create(element)
          if (!newArtist)
            return;
        }
      });
      console.log("--- Artists loaded successfully ---");
      break;
    case "playlists":
      datos.forEach(async (element: IPlaylist) => {
        const existingAlbum = await PlaylistModel.findOne({ Id: element.Id });

        if (existingAlbum)
          return;
        else {
          const newAlbum = await PlaylistModel.create(element)
          if (!newAlbum)
            return;
        }
      });
      console.log("--- Playlists loaded successfully ---");
      break;
    case "tracks":
      datos.forEach(async (element: ITrack) => {
        const existingTrack = await TrackModel.findOne({ Id: element.Id });

        if (existingTrack)
          return;
        else {
          const newTrack = await TrackModel.create(element)
          if (!newTrack)
            return;
        }
      });
      console.log("--- Tracks loaded successfully ---");
      break;
    case "users":
      datos.forEach((element: IGetUserData) => {
        UserModel.insertMany([element]).catch(() => {
          return
        })
      });
      break;
    case "users_google":
      datos.forEach((element: IGetGoogleUserData) => {
        UserGoogleModel.insertMany([element]).catch(() => {
          return
        })
      });
      break;
  }
}

export const loadDatabase = async () => {
  await loadData("albums")
  await loadData("artists")
  await loadData("playlists")
  await loadData("tracks")
  //loadData("users")
  //loadData("users_google")
}




