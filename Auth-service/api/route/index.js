const express = require("express");
const app = express();


const registerUser = require("./auth/register");

app.use("/auth", registerUser);


module.exports = app;