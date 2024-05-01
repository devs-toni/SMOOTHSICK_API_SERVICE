export interface IAlbum {
  _id: string;
  Id: string;
  title: string;
  label: string;
  upc: string;
  cover: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: Date;
  artist_id: string;
}

export interface IAlbumDto {
  _id: unknown
  Id: string;
  title: string;
  label: string;
  upc: string;
  cover: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: Date;
  artist_id: string;
  artist_picture: string;
  artist_name: string,
}
