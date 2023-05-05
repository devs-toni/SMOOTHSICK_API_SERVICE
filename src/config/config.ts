
import { env_parameters, env, Iconfig } from "./index";
require("dotenv").config();


const { NODE_ENV, PORT, DB_URI } = process.env;

export const ENV: env = NODE_ENV as env || "development";

class CONFIGURATION implements Iconfig {
    development: env_parameters = {
        app: {
            PORT: PORT as unknown as number || 4000,
            FRONT_URI: "http://127.0.0.1:5173"
        },
        db: {
            DB_URI: DB_URI as string
        }
    }
    production: env_parameters = {
        app: {
            PORT: PORT as unknown as number || 4000,
            FRONT_URI: "https://smoothsick-api.arcprojects.es"
        },
        db: {
            DB_URI: DB_URI as string
        }
    }
}
export default new CONFIGURATION()[ENV]