const express = require("express");
const app = express();


const documentRoutes = require("./document/document");

app.use("/document", documentRoutes);


module.exports = app;