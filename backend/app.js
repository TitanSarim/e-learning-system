const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");




if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: ".env" });
}

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const user = require("./routes/userRoutes");

app.use("/api/v1", user);

app.use(errorMiddleware);


module.exports = app;