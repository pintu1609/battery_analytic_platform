const express = require("express");
const app = express();

const noticationRoutes = require("./notification/notification");

app.use("/notification", noticationRoutes);

module.exports = app;
