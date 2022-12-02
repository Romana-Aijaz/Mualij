const mongoose = require("mongoose");
const groupPostSchema = new mongoose.Schema(
  {
    groupId: {
        type: String,
        required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("GroupPost", groupPostSchema);