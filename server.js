const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const router = express.Router();
dotenv.config({ path: "./config/config.env" });
const indexRouter = require("./routers/index.js");
const logger = require("./middleware/logger");
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const app = express();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

const server = app.listen({ port: process.env.PORT }, async () => {
	console.log(`Server up on http://localhost:${process.env.PORT}/ port ${process.env.PORT}`)
})