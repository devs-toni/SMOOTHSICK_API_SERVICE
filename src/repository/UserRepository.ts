import { IUserRegister, IUserRegisterGoogle } from "../models/User";
import { UserModel } from "./schemas/User";
import { UserGoogleModel } from "./schemas/UserGoogle";

export const UserRepository = {
  save: async (user: IUserRegister) => {
    try {
      const userExist = await UserModel.findOne({ email: user.email });
      const userGoogleExist = await UserGoogleModel.findOne({
        email: user.email,
      });
      if (!userExist && !userGoogleExist) return await UserModel.create(user);
      return 0;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },

  saveGoogle: async (user: IUserRegisterGoogle) => {
    try {
      const userExistGoogle = await UserGoogleModel.findOne({
        email: user.email,
      });
      const userExist = await UserModel.findOne({ email: user.email });
      if (!userExistGoogle && !userExist)
        return await UserGoogleModel.create(user);
      if (userExist) return 0;
      return userExistGoogle;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },

  get: async (email: string) => {
    try {
      const userFinded = await UserModel.findOne({ email });
      if (userFinded) return userFinded;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  getById: async (id: string) => {
    try {
      const userFinded = await UserModel.findOne({ _id: id });
      if (userFinded) return userFinded;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  googleGetById: async (id: string) => {
    try {
      const userFinded = await UserGoogleModel.findOne({ _id: id });
      if (userFinded) return userFinded;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  getAll: async () => {
    return await UserModel.find({}, { email: 1, name: 1, last_name: 1 });
  },

  FindByIdAndUpdate: async (id: string, pass: string) => {
    try {
      const updatedPass = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $set: { password: pass } },
      );
      if (updatedPass) return updatedPass;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },

  FindByIdAndUpdateUserName: async (id: string, userName: string) => {
    try {
      const updateUserName = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $set: { user_name: userName } },
      );
      if (updateUserName) return updateUserName;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },

  FindByIdAndUpdateGoogleUserName: async (id: string, userName: string) => {
    try {
      const updateUserName = await UserGoogleModel.findByIdAndUpdate(
        { _id: id },
        { $set: { user_name: userName } },
      );
      if (updateUserName) return updateUserName;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },

  FindByIdAndUpdateEmail: async (id: string, email: string) => {
    try {
      const updateUserEmail = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $set: { email } },
      );
      if (updateUserEmail) return updateUserEmail;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },

  FindByIdAndDelete: async (id: string) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
      if (deletedUser) return deletedUser;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },

  FindByIdAndDeleteGoogle: async (id: string) => {
    try {
      const deletedUser = await UserGoogleModel.findByIdAndDelete({ _id: id });
      if (deletedUser) return deletedUser;
      return undefined;
    } catch (error) {
      console.error(error);
    }
  },
};
