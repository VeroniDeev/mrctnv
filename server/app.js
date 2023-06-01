const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const BodyParser = require("body-parser");
const errorController = require("./controllers/errorController");

app.use(BodyParser.json());

app.use("/api", userRoute);
app.use("/admin", adminRoute);

app.use(errorController);

module.exports = app;
