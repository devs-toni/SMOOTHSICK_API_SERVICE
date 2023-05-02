import axios from "axios";
import { Request, Response } from "express";
import { ArtistRepository } from "../repository/ArtistRepository";
import { IArtist } from "../models/Artist";

export const AdminController = {
  reload: async (req: Request, res: Response) => {
    const ourArtists: string[] = [
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

    ArtistRepository.deleteAll();

    ourArtists.map((artistId) => {
      axios
        .get(`https://api.deezer.com/artist/${artistId}`)
        .then(async (response) => {
          console.log(response.data);
          const artist: IArtist = {
            id: response.data.id,
            name: response.data.name,
            picture: response.data.picture_xl,
            nb_album: response.data.nb_album,
            nb_fan: response.data.nb_fan,
          };
          await ArtistRepository.save(artist);
        });
    });
    res.redirect("http://localhost:5173/account");
  },
};
