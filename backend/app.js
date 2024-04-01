const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");



if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}


const app = express();

app.use(cors())


app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "5000000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5000000mb" }));

const user = require("./routes/userRoutes");
const course = require("./routes/courseRoutes");
const profile = require("./routes/profileRoutes");
const cart = require("./routes/cartRoutes");

app.use("/api/v1", user);
app.use("/api/v1", course);
app.use("/api/v1", profile);
app.use("/api/v1", cart);


app.use(errorMiddleware);

module.exports = app;
