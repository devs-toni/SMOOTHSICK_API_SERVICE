export interface IUserRegister {
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;
    token: string;
    role: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
