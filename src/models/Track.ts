import { IAlbum } from "./Album";
import { IArtist } from "./Artist";

export interface ITrack {
  id: string;
  readable: boolean;
  title: string;
  title_short: string;
  duration: number;
  track_position?: number;
  disk_number?: number;
  rank: number;
  preview?: string;
  artist_id?: string;
  album_id?: string;
  artist?: IArtist;
  album?: IAlbum;
  likes?: []
}
export interface ITrackDto {
  id: string;
  title: string;
  duration: number;
  rank: number;
  preview?: string;
  artist_id?: string;
  album_id?: string;
  album_cover: string;
  artist_name: string;
  likes: [],
}
