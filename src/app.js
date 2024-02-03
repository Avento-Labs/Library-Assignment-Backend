const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');

const cors = require("cors");
require("dotenv").config();
// this is where we import the models and the database connection
require("./models");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use( cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
