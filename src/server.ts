import CONFIGURATION, { ENV } from "./config/config"
import { loggerStream } from "./config/logger/winston"
import { AdminRouter } from "./router/AdminRouter";
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")
require("dotenv").config()

export const { app: env_app } = CONFIGURATION

export const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin: [env_app.FRONT_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use(morgan(
    ":method :url :status: :res[content-length]- :response-time ms - API Server",
    { stream: loggerStream, skip: () => !ENV }
))

app.use(helmet())
app.use(express.json());
app.use("/admin", AdminRouter);







