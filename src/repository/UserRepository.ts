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

    get: async (email: string) => {
        try {
            const userFinded = (await UserModel.findOne({ email }))
            if (userFinded) return userFinded;
            else return undefined;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
    
}

