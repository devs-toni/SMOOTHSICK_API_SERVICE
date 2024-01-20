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

const loadData = (entity: string) => {
    const datos = JSON.parse(fs.readFileSync(config.app.MIGRATIONS_URI + '.' + entity + '.json', 'utf-8'));

    switch (entity) {
      case "albums":
        datos.forEach((element: IAlbum) => {
          AlbumModel.insertMany([element]).catch(() => {
            return
          })
        });
        break;
      case "artists":
        datos.forEach((element: IArtist) => {
          ArtistModel.insertMany([element]).catch(() => {
            return
          })
        });
        break;
      case "playlists":
        datos.forEach((element: IPlaylist) => {
          PlaylistModel.insertMany([element]).catch(() => {
            return
          })
        });
        break;
      case "tracks":
        datos.forEach((element: ITrack) => {
          TrackModel.insertMany([element]).catch(() => {
            return
          })
        })
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

export const loadDatabase = () => {
  loadData("albums")
  loadData("artists")
  loadData("playlists")
  loadData("tracks")
  //loadData("users")
  //loadData("users_google")
}




