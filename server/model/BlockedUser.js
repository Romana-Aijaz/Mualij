//blocked users schema
const mongoose = require("mongoose");
const blockedUserSchema = new mongoose.Schema(
    {
      user: {
        type: Object,
        required: true
      },
      therapist: {
        type: Object,
        default: null
      }
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("BlockedUser", blockedUserSchema);