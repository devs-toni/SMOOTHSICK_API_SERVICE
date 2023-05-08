import { IUserLogin, IUserRegister } from "../models/User";
import { UserModel } from "./schemas/User";

export const UserRepository = {
  save: async (user: IUserRegister) => {
    try {
      const userExist = await UserModel.findOne({ email: user.email });
      if (!userExist) return await UserModel.create(user);
      return 0;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },

  get: async (email: String) => {
    try {
      const userFinded = await UserModel.findOne({ email });
      if (userFinded) return userFinded;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  getById: async (id: String) => {
    try {
      const userFinded = await UserModel.findOne({ _id: id });
      if (userFinded) return userFinded;
      else return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  getAll: async () => {
    return await UserModel.find({}, { email: 1, name: 1, last_name: 1 });
  },

    FindByIdAndUpdate: async (userId: String, pass: String) => {
        try {
            const updatedPass = await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { password: pass } })
            if (updatedPass) return updatedPass;
            return undefined;
        }
        catch (error) {
            console.error(error);
        }
    },

    FindByIdAndUpdateUserName: async (userId: String, userName: String) => {
        try {
            const updateUserName = await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { user_name: userName } })
            if (updateUserName) return updateUserName;
            return undefined;
        }
        catch (error) {
            console.error(error);

        }


    }
  },
};
