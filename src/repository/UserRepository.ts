import { IUserLogin, IUserRegister } from "../models/User";
import { UserModel } from "./schemas/User";

export const UserRepository = {
    save: async (user: IUserRegister) => {
        try {
            const userExist = await UserModel.findOne({ email: user.email });
            if (!userExist) return await UserModel.create(user);
            return 0;
        } catch (error) {
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

    FindByIdAndUpdate: async (id: String, pass: String) => {
        try {
            const updatedPass = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { password: pass } })
            if (updatedPass) return updatedPass;
            return undefined;
        }
        catch (error) {
            console.error(error);
        }
    },

    FindByIdAndUpdateUserName: async (id: String, userName: String) => {
        try {
            const updateUserName = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { user_name: userName } })
            if (updateUserName) return updateUserName;
            return undefined;
        }
        catch (error) {
            console.error(error);
        }
    },

    FindByIdAndUpdateEmail: async (id: String, email: String) => {
        try {
            const updateUserEmail = await UserModel.findByIdAndUpdate({ _id: id }, { $set: { email } })
            if (updateUserEmail) return updateUserEmail;
            return undefined;
        } catch (error) {
            console.error(error);

        }
    },

    FindByIdAndDelete: async (id: String) => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete({ _id: id })
            if (deletedUser) return deletedUser;
            return undefined;
        } catch (error) {
            console.error(error);
        }

    }

}

