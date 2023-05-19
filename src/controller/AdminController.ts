import axios from "axios";
import { Request, Response } from "express";
import { ArtistRepository } from "../repository/ArtistRepository";
import { IArtist } from "../models/Artist";
import { IAlbum } from "../models/Album";
import { AlbumRepository } from "../repository/AlbumRepository";
import { TrackRepository } from "../repository/TrackRepository";
import { ITrack } from "../models/Track";
import { IPlaylist } from "../models/Playlist";
import { PlaylistModel } from "../repository/schemas/Playlist";
import { PlaylistRepository } from "../repository/PlaylistRepository";
const data = require("../config/data.json");

export const AdminController = {
  reload: async (req: Request, res: Response) => {
    function sleep(milliseconds: number) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
          break;
        }
      }
    }
    const { playlists, artists, albums } = data;

/*     const artistsDeleted = await ArtistRepository.deleteAll();
    const albumsDeleted = await AlbumRepository.deleteAll();
    const tracksDeleted = await TrackRepository.deleteAll();
    const playlistsDeleted = await PlaylistRepository.deleteAll();

    if (artistsDeleted && albumsDeleted && playlistsDeleted && tracksDeleted) {
      await Promise.all(
        artists.map(async (artistId: string) => {
          await axios
            .get(`https://api.deezer.com/artist/${artistId}`)
            .then(async ({ data }) => {
              const artist: IArtist = {
                id: data.id,
                name: data.name,
                picture: data.picture_xl,
                nb_album: data.nb_album,
                nb_fan: data.nb_fan,
              };
              await ArtistRepository.save(artist);
            });
        })
      );

      await Promise.all(
        albums.map(async (albumId: string) => {
          await axios
            .get(`https://api.deezer.com/album/${albumId}`)
            .then(async (response) => {
              await axios
                .get(response.data.tracklist)
                .then(async ({ data }) => {
                  //SAVE ALBUM TRACKS
                  const tracklist = data.data;
                  tracklist.map(async (tr: ITrack) => {
                    const track: ITrack = {
                      id: tr.id,
                      readable: tr.readable,
                      title: tr.title,
                      title_short: tr.title_short,
                      duration: tr.duration,
                      track_position: tr.track_position,
                      disk_number: tr.disk_number,
                      rank: tr.rank,
                      preview: tr.preview,
                      artist_id: tr.artist!.id,
                      album_id: albumId,
                    };
                    await TrackRepository.save(track);
                  });
                });

              //SAVE ALBUM
              const album: IAlbum = {
                id: response.data.id,
                title: response.data.title,
                label: response.data.label,
                upc: response.data.upc,
                cover: response.data.cover_xl,
                nb_tracks: response.data.nb_tracks,
                duration: response.data.duration,
                fans: response.data.fans,
                release_date: response.data.release_date,
                artist_id: response.data.artist.id,
              };
              await AlbumRepository.save(album);
            });
        })
      );

      await Promise.all(
        playlists.map(async (playlistId: string) => {
          await axios
            .get(`https://api.deezer.com/playlist/${playlistId}`)
            .then(async ({ data }) => {
              //SAVE PLAYLIST TRACKS
              const tracks: string[] = [];
              const tracklist = data.tracks.data;
              tracklist.map(async (tr: ITrack) => {
                const track: ITrack = {
                  id: tr.id,
                  readable: tr.readable,
                  title: tr.title,
                  title_short: tr.title_short,
                  duration: tr.duration,
                  track_position: tr.track_position,
                  disk_number: tr.disk_number,
                  rank: tr.rank,
                  preview: tr.preview,
                };
                tracks.push(tr.id);
                await TrackRepository.save(track);
              });

              //SAVE PLAYLIST
              const playlist: IPlaylist = {
                id: data.id,
                title: data.title,
                description: data.description,
                duration: data.duration,
                nb_tracks: data.nb_tracks,
                picture: data.picture_xl,
                fans: data.fans,
                tracklist: tracks,
                creator_id: data.creator.id,
              };
              await PlaylistRepository.save(playlist);
            });
        })
      ); */
      res.redirect("http://localhost:5173/account");
    //}
  },
};
