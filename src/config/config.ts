
import { env_parameters, env, Iconfig } from "./index";
require("dotenv").config();


const { NODE_ENV, PORT, DB_URI } = process.env;

export const ENV: env = NODE_ENV as env || "development";

class CONFIGURATION implements Iconfig {
    development: env_parameters = {
        app: {
            PORT: PORT as unknown as number || 4000,
            FRONT_URI: "http://localhost:5173"
        },
        db: {
            DB_URI: DB_URI as string
        }
    }
    production: env_parameters = {
        app: {
            PORT: PORT as unknown as number || 4000,
            FRONT_URI: "https://smoothsick.arcprojects.es"
        },
        db: {
            DB_URI: DB_URI as string
        }
    }
}
export default new CONFIGURATION()[ENV]