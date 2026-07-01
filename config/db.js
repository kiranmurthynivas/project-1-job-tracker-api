const mongoose = require("mongoose");

mongoose.set("sanitizeFilter", true);

async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL?.trim();

    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }

    console.log("MongoDB connection string configured");
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
