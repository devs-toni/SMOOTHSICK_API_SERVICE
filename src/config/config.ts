import { env_parameters, env, Iconfig } from "./index";
//eslint-disable-next-line
require("dotenv").config();

const { NODE_ENV, PORT, DB_URI, DB_URI_PROD, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

export const ENV: env = (NODE_ENV as env) || "development";

class CONFIGURATION implements Iconfig {
  development: env_parameters = {
    app: {
      PORT: (PORT as unknown as number) || 4000,
      FRONT_URI: "http://localhost:5173",
    },
    db: {
      DB_URI: DB_URI as string,
    },
    cloudinary: {
      NAME: CLOUDINARY_NAME as string,
      KEY: CLOUDINARY_KEY as string,
      SECRET: CLOUDINARY_SECRET as string,
    },
  };
  production: env_parameters = {
    app: {
      PORT: (PORT as unknown as number) || 4000,
      FRONT_URI: "https://smoothsick.arcprojects.es",
    },
    db: {
      DB_URI: DB_URI_PROD as string,
    },
    cloudinary: {
      NAME: CLOUDINARY_NAME as string,
      KEY: CLOUDINARY_KEY as string,
      SECRET: CLOUDINARY_SECRET as string,
    },
  };
}
export default new CONFIGURATION()[ENV];
