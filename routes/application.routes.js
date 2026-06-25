const express = require("express");

const {
  createApplication,
  getAllApplications
} = require("../controllers/application.controller");

const router = express.Router();

router.route("/")
  .get(getAllApplications)
  .post(createApplication);

module.exports = router;