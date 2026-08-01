require("dotenv").config();

const app = require("../app");
const connectDB = require("../config/db");

// Connect to MongoDB once (serverless: connection is cached across invocations)
let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};

module.exports = handler;
