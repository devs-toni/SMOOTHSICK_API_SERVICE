export interface FormRegister {
    form: {
        name: string,
        lastname: string,
        username: string,
        email: string, password:
        string, token: string
    }
}

export interface FormLogin {
    userData: {
        email: string,
        password: string,
        id: string
    }
}


// export interface GetUserData {
//     getUserData: {
//         id: string;
//         name: string;
//         last_name: string;
//         user_name: string;
//         email: string;
//         role: string;
//     },
//     token: string
// }