require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let dbConnection;

const options = {
  dbName: process.env.DB_NAME || "battery_analytic_platform",
};

exports.connectToDatabase = async (req, res, next) => {
  const mongoURI =
    process.env.DB_STRING ||
    "mongodb+srv://pintukumar808284:ZyLWuB7bdBrOebml@cluster0.kqbqscz.mongodb.net/?retryWrites=true&w=majority";

  try {
    const db = await mongoose.connect(mongoURI, options);
    dbConnection = db.connections[0].readyState;
    console.log("----DB----CONNECTED----------------");
    return dbConnection;
  } catch (err) {
    console.error("----DB----CONNECTION-ERROR----------------");
    throw err;
  }
};
