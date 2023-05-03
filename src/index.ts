import { connectDb } from "./db/connect";
import CONFIGURATION from "./config/config";
import { app } from "./server";
import { logger } from "./config/logger/winston";

const { app: env_app } = CONFIGURATION;

connectDb()
  .then(() => {
    logger.console("Database connected!");
    app.listen(env_app.PORT, () => {
      logger.console("Application running on port " + env_app.PORT);
    });
  })
  .catch((err) => logger.error(err));
