//group Schema
const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema(
    {
      groupName: {
        type: String,
        required: true, 
      },
      groupProfilePic: {
        type: String,
        default: ""
      }, 
      groupCoverPic: {
        type: String,
        default: ""
      },
      ownerId: {
        type: String,
        required: true
      },
      members: {
        type: Array,
        default: [],
      },
      posts: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("Groups", groupSchema);