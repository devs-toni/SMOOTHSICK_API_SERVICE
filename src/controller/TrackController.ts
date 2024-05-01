import { Request, Response } from "express";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";
import { ITrackDto, ITrack } from "../models/Track";
import { uploadAudioFile, uploadImage } from "../cloudinary/cloudinary";

interface MulterRequest extends Request {
  body: {
    data: unknown;
  };
  files: {
    audio: {
      name: string;
      tempFilePath: string;
    };
    image: {
      name: string;
      data: unknown;
      size: number;
      encoding: string;
      tempFilePath: string;
      truncated: boolean;
      mimetype: string;
      md5: string;
      mv: () => void;
    };
  };
}

export const TrackController = {
  //eslint-disable-next-line
  save: async (req: MulterRequest, res: any) => {
    const data = req.body.data as unknown as ITrack;
    const result = await TrackRepository.save(data);
    return res.send(result);
  },
  //eslint-disable-next-line
  uploadAudio: async (req: MulterRequest, res: any) => {
    const audioUploaded = await uploadAudioFile(
      req.files.audio.name,
      req.files.audio.tempFilePath,
    )
      .then((res) => {
        return res;
      })
      .catch(() => {
        return undefined;
      });
    if (typeof audioUploaded === "undefined") return res.status(500).send();
    return res.send(audioUploaded);
  },
  //eslint-disable-next-line
  uploadImage: async (req: MulterRequest, res: any) => {
    const imageUploaded = await uploadImage(req.files.image.tempFilePath);
    if (typeof imageUploaded === "undefined") return res.status(500).send();
    return res.send(imageUploaded);
  },

  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const track = await TrackRepository.findById(id);
    return res.send(track);
  },

  getWithImageById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const track = await TrackRepository.findById(id);

    if (track?.album_id && track?.artist_id) {
      const album = await AlbumRepository.findById(track?.album_id);
      const artist = await ArtistRepository.findById(track?.artist_id);
      const newTrack = {
        id: track.id,
        Id: track.Id,
        title: track.title,
        duration: track.duration,
        rank: track.rank,
        preview: track.preview,
        album_id: track.album_id,
        album_cover: album[0]?.cover,
        artist_name: artist[0]?.name ? artist[0].name : "",
        likes: track.likes,
      };
      return res.send(newTrack);
    }
    return res.send(track);
  },

  getAll: async (req: Request, res: Response) => {
    const allTracks = await TrackRepository.findAll();
    return res.send(allTracks);
  },

  getAllHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findAllHome();
    const finalData: ITrackDto[] = [];
    const finalTracks: ITrack[] = [];

    await Promise.all(
      artists.map(async (artist) => {
        const track = await TrackRepository.findBestSong(artist.Id);
        if (typeof track[0] !== "undefined") finalTracks.push(track[0]);
      }),
    );

    await Promise.all(
      finalTracks.map(
        async ({
          _id,
          Id, 
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id: _id,
                Id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        },
      ),
    );
    return res.send(finalData);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const artists = await ArtistRepository.findMoreHome();
    
    const finalData: ITrackDto[] = [];
    const finalTracks: ITrack[] = [];

    await Promise.all(
      artists.map(async (artist) => {      
        const track = await TrackRepository.findBestSong(artist.Id);
        
        if (typeof track[0] !== "undefined") finalTracks.push(track[0]);
      }),
    );

    await Promise.all(
      finalTracks.map(
        async ({
          _id,
          Id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id: _id,
                Id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        },
      ),
    );    
    return res.send(finalData);
  },

  getOwnerHome: async (req: Request, res: Response) => {
    const tracks = await TrackRepository.findOwner();
    return res.send(tracks);
  },

  getTop: async (req: Request, res: Response) => {
    const id = req.params.id;
    const finalData: ITrackDto[] = [];
    const tracks = await TrackRepository.findTopFour(id);
    await Promise.all(
      tracks.map(
        async ({
          _id,
          Id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0) {
              finalData.push({
                id: _id,
                Id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        },
      ),
    );
    return res.send(finalData);
  },

  getMySongs: async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const mySongs = await TrackRepository.findMySongs(userId);
    res.send(mySongs);
  },

  toggleLike: async (req: Request, res: Response) => {
    const trackId = req.params.id;
    const userId = res.locals.user.id;
    const isLike = await TrackRepository.findLikeById(trackId, userId);
    let result;

    if (isLike.length > 0) {
      result = await TrackRepository.toggleLike(trackId, userId, "-");
    } else {
      result = await TrackRepository.toggleLike(trackId, userId, "+");
    }
    if (result?.acknowledged) res.send();
    else res.status(500).send();
  },

  update: async (req: Request, res: Response) => {
    const trackId = req.params.id;
    const newTrack = req.body.newTrack;
    const result = await TrackRepository.updateById(trackId, newTrack);
    return res.status(result.acknowledged ? 200 : 500).send(result);
  },

  deleteSong: async (req: Request, res: Response) => {
    const trackId = req.params.id;
    const result = await TrackRepository.deleteById(trackId);
    return res.status(result.acknowledged ? 200 : 500).send(result);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await TrackRepository.search(str);
    const finalData: ITrackDto[] = [];

    await Promise.all(
      results.map(
        async ({
          _id,
          Id,
          title,
          duration,
          rank,
          preview,
          album_id,
          artist_id,
          likes,
        }) => {
          if (album_id) {
            const album = await AlbumRepository.findById(album_id);
            const artist = await ArtistRepository.findById(artist_id!);
            if (album.length !== 0 && artist.length !== 0) {
              finalData.push({
                id: _id,
                Id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0].name,
                likes: likes ? likes : [],
              });
            }
          }
        },
      ),
    );
    return res.send(finalData);
  },
};
