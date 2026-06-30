const mongoose = require("mongoose");
const Application = require("../models/application.model");

function isInvalidObjectId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

// POST /api/applications
async function createApplication(req, res) {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user._id
    });

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
// GET /api/applications
async function getAllApplications(req, res) {
  try {
    const {
      status,
      jobType,
      search,
      sort = "latest",
      page = 1,
      limit = 10
    } = req.query;

    const queryObject = {
       user: req.user._id
    };

    // Filter by status
    if (status) {
      queryObject.status = status;
    }

    // Filter by jobType
    if (jobType) {
      queryObject.jobType = jobType;
    }

    // Search by company or role
    if (search) {
      queryObject.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "company") {
      sortOption = { company: 1 };
    }

    if (sort === "status") {
      sortOption = { status: 1 };
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const applications = await Application.find(queryObject)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalApplications = await Application.countDocuments(queryObject);

    res.status(200).json({
      success: true,
      count: applications.length,
      total: totalApplications,
      page: pageNumber,
      totalPages: Math.ceil(totalApplications / limitNumber),
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

    const application = await Application.findOne({
      _id: id,
      user: req.user._id
    });

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