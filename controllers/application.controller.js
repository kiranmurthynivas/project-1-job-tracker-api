const Application = require("../models/application.model");

async function createApplication(req, res) {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function getAllApplications(req, res) {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createApplication,
  getAllApplications
};