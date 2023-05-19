import { AdminRouter } from "./router/AdminRouter";
import { AlbumRouter } from "./router/AlbumRouter";
import { ArtistRouter } from "./router/ArtistRouter";
import { PlaylistRouter } from "./router/PlaylistRouter";
import { TrackRouter } from "./router/TrackRouter";
import { NextFunction, Request, Response } from "express";
import CONFIGURATION, { ENV } from "./config/config";
import { loggerStream } from "./config/logger/winston";
import { UserRouter } from "./router/UserRouter";
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { json } = require("body-parser");
export const app = express();
const { app: env_app } = CONFIGURATION;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: [env_app.FRONT_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(
  morgan(
    ":method :url :status: :res[content-length]- :response-time ms - API Server",
    { stream: loggerStream, skip: () => !ENV }
  )
);
app.use(helmet());
app.use((request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  next();
});
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: { fileSize: 30000000 },
    abortOnLimit: true,
  })
);
app.use(json({ limit: "50mb" }));

app.use("/admin", AdminRouter);
app.use("/artists", ArtistRouter);
app.use("/albums", AlbumRouter);
app.use("/playlists", PlaylistRouter);
app.use("/tracks", TrackRouter);
app.use("/users", UserRouter);
