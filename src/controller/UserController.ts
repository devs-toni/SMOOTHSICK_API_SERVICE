import { Request, Response } from "express";
import { FormLogin, FormRegister, FormRegisterGoogle } from "../entity/User";
import { IGetGoogleUserData, IGetUserData, IUserLogin, IUserRegister, IUserRegisterGoogle } from "../models/User";
import { UserRepository } from "../repository/UserRepository";
import { TrackRepository } from "../repository/TrackRepository";
import { AlbumRepository } from "../repository/AlbumRepository";
import { tokenGenerator } from "../helpers/tokenGenerator";
import { ArtistRepository } from "../repository/ArtistRepository";
import { ITrackDto } from "../models/Track";
import { PlaylistRepository } from "../repository/PlaylistRepository";
const bcrypt = require("bcrypt");

export const UserController = {
  async getAll(req: Request, res: Response) {
    const users = await UserRepository.getAll();
    res.send(users);
  },

  async getPlaylists(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const playlists = await PlaylistRepository.findByCreatorId(userId);
    res.status(201).send(playlists)
  },

  async deletePlaylist(req: Request, res: Response) {
    const playlistId = req.params.id;
    try {
      const deletedPlaylist = await PlaylistRepository.FindByIdAndDelete(playlistId);
      if (deletedPlaylist) return res.status(201).send("Playlist deleted successfully")
    } catch (error) {
      return res.status(500).send("Error deleting playlist")
    }
  },

  async getFavourites(req: Request, res: Response) {
    const userId = res.locals.user.id;
    console.log(userId)
    const tracks = await TrackRepository.findFavouritesByUserId(userId);
    const finalData: ITrackDto[] = [];
    await Promise.all(
      tracks.map(
        async ({
          id,
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
                id,
                title,
                duration,
                rank,
                preview,
                artist_id,
                album_id,
                album_cover: album[0].cover,
                artist_name: artist[0]?.name,
                likes: likes ? likes : [],
              });
            }
          }
        }
      )
    );
    res.send(finalData);
  },
  async register(req: Request, res: Response) {
    const params: FormRegister = req.body;
    const { form } = params;
    await bcrypt.hash(form.password, 10, (error: string, hash: string) => {
      if (error) throw error;
      const user: IUserRegister = {
        name: form.name,
        last_name: form.lastname,
        user_name: form.username,
        email: form.email,
        password: hash,
        token: form.token,
        role: "U",
      };
      const saveUser = UserRepository.save(user);
      saveUser.then((user) => {
        if (typeof user === "undefined")
          return res.status(500).send("Error al registrar");
        if (typeof user === "number")
          return res.status(204).send("User exists");
        return res.status(200).send(saveUser);
      });
    });
  },

  async authenticateGoogle(req: Request, res: Response) {
    const googleUser: FormRegisterGoogle = req.body;
    const user: IUserRegisterGoogle = {
      name: googleUser.firstName,
      last_name: googleUser.lastName,
      user_name: googleUser.firstName,
      email: googleUser.email,
      picture: googleUser.profilePicture,
      role: "U",
    }
    const currentUser = await UserRepository.get(user.email)
    if (typeof currentUser === "undefined") {
      const userGoogle = await UserRepository.saveGoogle(user);
      if (userGoogle) {
        const token = await tokenGenerator(userGoogle.id);
        if (token) return res.status(201).send({ token, userGoogle })
      } else {
        return res.status(500).send("Something went wrong");
      }
    } else {
      return res.status(409).send("User already exists")

    }

  },

  async authenticate(req: Request, res: Response) {
    const params: FormLogin = req.body;
    const { userData } = params;
    const user: IUserLogin = {
      email: userData.email,
      password: userData.password,
      id: userData.id,
    };
    const currentUser = await UserRepository.get(user.email);
    if (typeof currentUser === "undefined")
      return res.status(401).send("Incorrect login data");
    const token = await tokenGenerator(currentUser.id);
    await bcrypt.compare(
      userData.password,
      currentUser?.password,
      (error: string, result: boolean) => {
        if (error) throw error;
        if (result) return res.status(200).send({ token, currentUser });
        if (!result) return res.status(401).send("Incorrect login data");
        return res.status(500).send("Something went wrong");
      }
    );
  },



  async authorizate(_req: Request, res: Response) {
    const user = res.locals.user;
    if (res.locals.user) {
      const currentUser = await UserRepository.getById(user.id);
      if (currentUser?.role === "A") return res.send(true);
      if (currentUser?.role === "U") return res.send(false);
    }
  },

  async getUserData(req: Request, res: Response) {
    const user = res.locals.user;
    const { id } = user


    if (user.password === undefined) {
      const currentUser = await UserRepository.googleGetById(id);

      const userToSend: IGetGoogleUserData = {
        id: currentUser?.id,
        name: currentUser?.name,
        last_name: currentUser?.last_name,
        user_name: currentUser?.user_name,
        email: currentUser?.email,
        picture: currentUser?.picture,
        role: currentUser?.role,
      }
      if (userToSend) return res.status(200).send(userToSend);
      return res.status(500).send("Something went wrong");
    } else {
      const currentUser = await UserRepository.getById(id);
      const userToSend: IGetUserData = {
        id: currentUser?.id,
        name: currentUser?.name,
        last_name: currentUser?.last_name,
        user_name: currentUser?.user_name,
        email: currentUser?.email,
        role: currentUser?.role,
      };
      if (userToSend) return res.status(200).send(userToSend);
      return res.status(500).send("Something went wrong");
    }


  },

  async validatePass(req: Request, res: Response) {
    const { id, currentPass } = req.body;
    const findUserData = await UserRepository.getById(id);
    if (findUserData) {
      bcrypt.compare(
        currentPass,
        findUserData.password,
        (error: string, result: boolean) => {
          if (error) throw error;
          if (result) return res.status(201).send("Correct password");
          if (!result) return res.status(204).send("Incorrect password");
          return res.status(500).send("Something went wrong");
        }
      );
    }
  },

  async changePass(req: Request, res: Response) {
    const { id, pass } = req.body;
    try {
      const newPass = await bcrypt.hash(pass, 10)
      const updatePass = await UserRepository.FindByIdAndUpdate(id, newPass)
      if (updatePass) return res.status(201).send("Password updated successfully")
      return res.status(204).send("Username does not exist")

    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error")
    }
  },


  async changeUserName(req: Request, res: Response) {
    const { id, userName } = req.body;
    try {
      const updateUserName = await UserRepository.FindByIdAndUpdateUserName(id, userName)
      if (updateUserName) return res.status(201).send("User name updated successfully")
      return res.status(204).send("User does not exist")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error")
    }
  },

  async changeUserEmail(req: Request, res: Response) {
    const { id, userEmail } = req.body;
    try {
      const currentUser = await UserRepository.get(userEmail);
      if (currentUser) return res.status(204).send("Email already exists");
      if (!currentUser) {
        const updateUserEmail = await UserRepository.FindByIdAndUpdateEmail(id, userEmail)
        if (updateUserEmail) return res.status(201).send("User email updated successfully")
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },


  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const userDeleted = await UserRepository.FindByIdAndDelete(id);
      if (userDeleted) return res.status(201).send("User deleted successfully")
      return res.status(204).send("User does not exist")
    } catch (error) {
      console.error(error);
    }
  }

};
