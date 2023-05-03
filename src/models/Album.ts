export interface IAlbum {
  id: string;
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
