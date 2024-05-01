import { connectDb } from "./db/connect";
import CONFIGURATION from "./config/config";
import { app } from "./server";
import { loadDatabase } from "./db/loader";

const { app: env_app } = CONFIGURATION;

connectDb()
  .then(async () => {     
    console.log("--- Database connected in host " + CONFIGURATION.db.DB_URI + " ---");
    console.log("--- Loading data in database .  .  . ---");
    await loadDatabase()
    console.log("--- Database loaded successfully. ---");
    
    app.listen(env_app.PORT, () => {
      console.log("--- Application running on port " + env_app.PORT + " ---");
    });
  })
  .catch((err) => console.log(err));
