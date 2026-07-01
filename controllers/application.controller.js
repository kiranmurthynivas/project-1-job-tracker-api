const mongoose = require("mongoose");
const Application = require("../models/application.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

function isInvalidObjectId(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Application created successfully",
    data: application
  });
});

const getAllApplications = asyncHandler(async (req, res) => {
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

  if (status) {
    queryObject.status = status;
  }

  if (jobType) {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } }
    ];
  }

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
});

const getApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isInvalidObjectId(id)) {
    throw new AppError("Invalid application ID", 400);
  }

  const application = await Application.findOne({
    _id: id,
    user: req.user._id
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    data: application
  });
});

const updateApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isInvalidObjectId(id)) {
    throw new AppError("Invalid application ID", 400);
  }

  const application = await Application.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id
    },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: application
  });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isInvalidObjectId(id)) {
    throw new AppError("Invalid application ID", 400);
  }

  const application = await Application.findOneAndDelete({
    _id: id,
    user: req.user._id
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
    data: application
  });
});

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
};