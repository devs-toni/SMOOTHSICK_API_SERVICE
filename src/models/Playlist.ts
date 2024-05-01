export interface IPlaylist {
  _id?: string;
  Id: string;
  title: string;
  description?: string;
  duration: number;
  nb_tracks: number;
  picture?: string;
  fans: number;
  tracklist: string[];
  creator_id: string;
}

export interface IUserPlaylist {
  id: string;
  Id: string;
  title: string;
  description?: string;
  picture: string;
  tracklist: string[];
  creator_id: string;
}
