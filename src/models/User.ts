export interface IUserRegister {
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;
    token: string;
    role: string;
}

export interface IUserRegisterGoogle {
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    picture: string
    role: string;
}

export interface IUserLogin {
    email: string;
    password: string;
    id: string
}



export interface IGetUserData {
    id: string;
    name: string;
    last_name: string;
    user_name: string;
    email: string;
    role: string;
}

export interface IGetGoogleUserData {
    id: string;
    name: string;
    last_name: string;
    user_name: string;
    email: string;
    picture: string
    role: string;
}