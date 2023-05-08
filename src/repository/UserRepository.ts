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
            return undefined
        }
    },

    get: async (email: String) => {
        try {
            const userFinded = await UserModel.findOne({ email })
            if (userFinded) return userFinded;
            else return undefined;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    },

    getById: async (id: String) => {
        try {
            const userFinded = await UserModel.findOne({ _id: id })
            if (userFinded) return userFinded;
            else return undefined;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    },

    FindByIdAndUpdate: async (userId: String, pass: String) => {
        console.log(userId, pass);

        try {
            const updatedPass = await UserModel.findByIdAndUpdate({ _id: userId },
                {
                    $set:
                    {
                        password: pass
                    }
                }
            )
            if (updatedPass) return console.log("actulizada");

            else return undefined;
        }
        catch (error) {
            console.error(error);

        }


    }
}