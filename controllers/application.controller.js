const mongoose = require("mongoose");
const Application = require("../models/application.model");

function isInvalidObjectId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

// POST /api/applications
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

// GET /api/applications
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

// GET /api/applications/:id
async function getApplicationById(req, res) {
  try {
    const { id } = req.params;

    if (isInvalidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// PATCH /api/applications/:id
async function updateApplication(req, res) {
  try {
    const { id } = req.params;

    if (isInvalidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

// DELETE /api/applications/:id
async function deleteApplication(req, res) {
  try {
    const { id } = req.params;

    if (isInvalidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      data: application
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
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
};