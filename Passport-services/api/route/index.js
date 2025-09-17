const express = require("express");
const app = express();

const userPassport = require("./passport/passport");

app.use("/passport", userPassport);

module.exports = app;
