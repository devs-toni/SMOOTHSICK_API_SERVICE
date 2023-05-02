import { ITrack } from "./Track";

export interface IPlaylist {
  id: string;
  title: string;
  description?: string;
  duration: number;
  nb_tracks: number;
  picture: string;
  fans: number;
  tracklist: string[],
  creator_id: string; 
}