const mongoose = require("mongoose");

mongoose.set("sanitizeFilter", true);

async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL?.trim();

    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }

    console.log("MongoDB connection string configured");
    const parsedUrl = new URL(mongoUrl);

    console.log("MongoDB URL protocol:", parsedUrl.protocol);
    console.log("MongoDB URL username:", parsedUrl.username);
    console.log("MongoDB URL host:", parsedUrl.host);
    console.log("MongoDB URL database:", parsedUrl.pathname);
    console.log("MongoDB password length:", parsedUrl.password.length);
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
