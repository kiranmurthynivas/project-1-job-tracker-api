const express = require("express");
const cors = require("cors");

const applicationRoutes = require("./routes/application.routes");

const app = express();

app.use(cors());
app.use(express.json());

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

app.use("/api/applications", applicationRoutes);

module.exports = app;