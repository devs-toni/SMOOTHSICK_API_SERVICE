const express = require("express")
const helmet = require("helmet")
const cors = require("cors ")
require("dotenv").config()
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

