const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const applicationRoutes = require("./routes/application.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(helmet());


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});


app.use(express.json());
app.use("/api", limiter);

app.get("/", (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "Job Application Tracker API is running"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "server is healthy"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;