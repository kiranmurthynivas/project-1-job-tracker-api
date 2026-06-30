const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Internship", "Contract", "Remote"],
      default: "Full-time"
    },

    location: {
      type: String,
      trim: true,
      default: "Not specified"
    },

    appliedDate: {
      type: Date,
      default: Date.now
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;