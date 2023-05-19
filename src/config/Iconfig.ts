export type env = "development" | "production";


export interface env_parameters {
    app: {
        PORT: number,
        FRONT_URI: string
    }
    db: {
        DB_URI: string
    }
    cloudinary: {
      NAME: string,
      KEY: string,
      SECRET: string,
    }
}


export interface Iconfig {
    development: env_parameters,
    production: env_parameters
}

