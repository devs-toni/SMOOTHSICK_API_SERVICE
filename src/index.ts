import { connectDb } from "./db/connect";
import CONFIGURATION from "./config/config";
import { app } from "./server";

const { app: env_app } = CONFIGURATION;

connectDb()
  .then(() => {
    console.log("Database connected!");
    app.listen(env_app.PORT, () => {
      console.log("Application running on port " + env_app.PORT);
    });
  })
  .catch((err) => console.error(err));