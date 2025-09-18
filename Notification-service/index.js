const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./api/middleware/db.js");
const { startKafkaConsumer } = require("./api/helper/kafka");


const routes = require("./api/route/index.js");
const { useErrorHandler } = require("./api/middleware/error-handler.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(db.connectToDatabase);

app.use("/api/v1/", routes);

const server = http.createServer(app);
const portNumber = process.env.PORT || 5000;


const startServer = async () => {
  try {
    // ✅ Connect to database first
    await db.connectToDatabase();

    // ✅ Start Kafka consumer after DB is ready
    await startKafkaConsumer();

    server.listen(portNumber, () => {
      console.log(`Server is running on port ${portNumber}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Stop server if DB or Kafka fails
  }
};

startServer();

app.use(useErrorHandler);
