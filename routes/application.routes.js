const express = require("express");

const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} = require("../controllers/application.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllApplications)
  .post(createApplication);

router
  .route("/:id")
  .get(getApplicationById)
  .patch(updateApplication)
  .delete(deleteApplication);

module.exports = router;