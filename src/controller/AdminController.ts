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

export const AdminController = {
  reload: async (req: Request, res: Response) => {
    const selectedArtists: string[] = [
      "271722", //Manel
      "5541552", //Oques Grasses
      "4474", //Estopa
      "1853921", //Txarango
      "1216573", //Los Chikos del Maíz
      "10583405", //Bad Bunny
      "11559031", //Manuel Turizo
      "8706544", //Dua Lipa
      "4050205", //The Weeknd
      "1350335", //Frank Ocean
      "12918", //La Renga
      "412", //Queen
      "12562316", //ACDC
      "447246", //Abel Pintos
      "1424821", //Lana del Rey
      "75798", //Adele
      "405", //Johnnt Cash
      "13", //Eminem
      "542", //David Guetta
      "259", //Micheal Jackson
      "4020872", //Kadebostany
      "133863", //Brejcha
      "1018354", //Jaden
      "567442", //Synapson
      "4443465", //David Kushneir
      "4794268", //Liam Payne
    ];

    const selectedAlbums: string[] = [
      "1055988", // Manel
      "329227757", // Oques Grasses
      "12802682",
      "313456827",
      "911045", //Estopa
      "1421320",
      "77495",
      "97865",
      "98415",
      "1331611",
      "102751352",
      "313456967", // Txarango
      "325393247",
      "332890177",
      "354005847",
      "1075683", //Los Chikos del Maíz
      "12992434",
      "9074561",
      "111441922",
    ];

    const selectedPlaylists: string[] = [
      "5852428522", //Manel
      "8978448642",
      "7533060962",
      "1181118031",
      "9006495002", //Oques Grasses
      "1613950585",
      "1450249715",
      "8233462122",
      "1792231522", //Estopa
      "7457579944",
      "2674858564",
      "1282103385",
      "7902850942",
      "3623837946", //Txarango
      "4797949028",
      "7752394602",
      "5715007062", //Los Chikos del Maíz
      "2935020182",
      "5510650262",
    ];

    //const artistsDeleted = await ArtistRepository.deleteAll();
    //const albumsDeleted = await AlbumRepository.deleteAll();
    //const tracksDeleted = await TrackRepository.deleteAll();
    //const playlistsDeleted = await PlaylistRepository.deleteAll();

    //if (artistsDeleted && albumsDeleted && playlistsDeleted && tracksDeleted) {
    await Promise.all(
      selectedArtists.map(async (artistId) => {
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
      selectedAlbums.map(async (albumId) => {
        await axios
          .get(`https://api.deezer.com/album/${albumId}`)
          .then(async (response) => {
            await axios.get(response.data.tracklist).then(async ({ data }) => {
              //SAVE ALBUM TRACKS
              const tracklist = data.data;
              tracklist.map(async (tr: ITrack) => {
                console.log(tr);
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

    /*  await Promise.all(
        selectedPlaylists.map(async (playlistId) => {
          await axios
            .get(`https://api.deezer.com/playlist/${playlistId}`)
            .then(async ({ data }) => {
              //SAVE PLAYLIST TRACKS
              const tracks: string[] = [];
              const tracklist = data.tracks.data;
              console.log(tracklist);
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
                  album_id: tr.album!.id,
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
