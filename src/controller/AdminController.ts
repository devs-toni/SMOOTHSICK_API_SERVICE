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
    /* const selectedArtists: string[] = [
      "271722", //Manel
      "5541552", //Oques Grasses
      "4474", //Estopa
      "1853921", //Txarango
      "1216573", //Los Chikos del Maíz
      "10583405", //Bad Bunny
      "11559031", //Manuel Turizo
      "5536564", //Arcangel
      "4937383", //Ozuna
      "8706544", //Dua Lipa
      "4050205", //The Weeknd
      "1350335", //Frank Ocean
      "12918", //La Renga
      "412", //Queen
      "75041", //Spinneta
      "12135", //Los Redondos
      "4345", //Soda Stereo
      "12562316", //ACDC
      "447246", //Abel Pintos
      "1424821", //Lana del Rey
      "75798", //Adele
      "405", //Johnny Cash
      "13", //Eminem
      "542", //David Guetta
      "4020872", //Kadebostany
      "133863", //Brejcha
      "1018354", //Jaden
      "567442", //Synapson
      "4443465", //David Kushneir
      "4794268", //Liam Payne
      "4762", //Bruce
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
      "6983518", //Abel pintos
      "229897402",
      "11220222",
      "109441", //La Renga
      "418462937",
      "392047297",
      "14713576", //Spinneta
      "1219410",
      "60542682", //Kadebostany
      "60450782",
      "7047708",
      "135664792",
      "42846911",
      "75621062", //Queen
      "1121401",
      "1127912",
      "725250",
      "307493027", //Boris Brejcha
      "268407112",
      "149906472",
      "127191422",
      "83742072",
      "168869212", //Jaden
      "251504582",
      "101993112",
      "101993232",
      "78523082",
      "1214583", //Soda Stereo
      "382011",
      "1222448",
      "369513367", //Synapson
      "188601072",
      "57380772",
      "11211508",
      "13554281",
      "355024757", //David Krushner
      "180947052",
      "134433962",
      "177707832", //Liam Payne
      "140571342",
      "129700992",
      "71062882",
      "414723077", //Tiesto
      "393657177",
      "147374822",
      "127777432",
      "63778112",
      "44693231", //Los Redondos
      "44693221",
      "44701181",
      "44701201",
      "44693211",
      "381907637", //Arcangel
      "257250872",
      "176764842",
      "123833872",
      "66551442",
      "185526292", //ACDC
      "9358032",
      "9410112",
      "9410116",
      "9410114",
      "359058387", //Ozuna
      "170109192",
      "71435252",
      "46000842",
      "316164367", //Bad Bunny
      "188972392",
      "133878352",
      "101490842",
      "82541262",
      "411961147", //Manuel Turizo
      "219594972",
      "104104162",
      "137765312",
      "169258072", //Dua Lipa
      "182811182",
      "205640032",
      "42194891",
      "75775892",
      "285758422", //The Weeknd
      "137272602",
      "139881992",
      "14652356",
      "11107272",
      "104660202", //Frank Ocean
      "9908666",
      "11429810", //Eminem
      "247208",
      "14638278",
      "72000342",
      "6103175", //Lana del Rey
      "420368197",
      "267169752",
      "215960112",
      "430178", //David Guetta
      "511046",
      "304150",
      "7452568", //Johnny Cash
      "7452480",
      "7463537",
      "7458441",
      "1419968", //Bruce
      "72804852",
      "1440805",
      "273425942", //Adele
      "14880539",
      "746059",
      "105781",
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
      "7789603502", //Abel Pintos
      "2345677726",
      "8318921922", //La Renga
      "4454284108",
      "8350625762", //Spinneta
      "7151056644",
      "7615940662", //Kadebostany
      "1103656501",
      "10976539162",
      "378243195", //Queen
      "4696861764",
      "2021502402", //Boris Brejcha
      "1275756721",
      "8766345562", //Jade
      "2935020182",
      "4943725304",
      "1728268443", //Soda Stereo
      "781612175", //Synapson
      "7615948702",
      "7664377462",
      "53362031", //David Krushner
      "4403076402",
      "9346933942",
      "915487765", //Liam Payne
      "7615942042",
      "4888783264",
      "7615937942", //Tiesto
      "7206054584",
      "3132456982",
      "8315163282", //Los Redondos
      "8873112222",
      "8182318922", //Arcangel
      "5160010784",
      "8186437902",
      "1286722045", //ACDC
      "3126664682",
      "4820458864", //Ozuna
      "8103909742",
      "178699142",
      "4962683744", //Bad Bunny
      "8399202022",
      "5215365588",
      "1650848163", //Manuel Turizo
      "7427031844",
      "10292644142",
      "4880867664", //Dua Lipa
      "7836095362",
      "1479458365",
      "1282483245",
      "2098157264", //The Weeknd
      "3110422662",
      "1479458365",
      "6708652884", //Frank Ocean
      "1786922822",
      "2578576804",
      "7662551722", //Eminem
      "3645740262",
      "1724212365",
      "1264577943",
      "9372936102", //Lana del Rey
      "1976454162",
      "3110419262",
      "10820031362",
      "3067981882", //David Guetta
      "706093725",
      "10292644142",
      "1479458365",
      "339301555", //Johnny Cash
      "7848489282",
      "3181211662",
      "5747086942",
      "5313870662", //Bruce
      "1306931615",
      "4068687546",
      "715215865", //Adele
      "3110429622",
      "1282483245",
    ];

    const artistsDeleted = await ArtistRepository.deleteAll();
    const albumsDeleted = await AlbumRepository.deleteAll();
    const tracksDeleted = await TrackRepository.deleteAll();
    const playlistsDeleted = await PlaylistRepository.deleteAll();

    if (artistsDeleted && albumsDeleted && playlistsDeleted && tracksDeleted) {
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
              await axios
                .get(response.data.tracklist)
                .then(async ({ data }) => {
                  //SAVE ALBUM TRACKS
                  const tracklist = data.data;
                  tracklist.map(async (tr: ITrack) => {
                    //console.log(tr);
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
      );
      res.redirect("http://localhost:5173/account");
    } */
  },
};
