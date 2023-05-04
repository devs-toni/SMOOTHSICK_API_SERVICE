export interface FormRegister {
    form: { name: string, lastname: string, username: string, email: string, password: string, token: string }
}

export interface FormLogin {
    userData: { email: string, password: string, id: string }
}