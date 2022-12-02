//Blogs Schema
const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        default: ""
      },
      likes: {
        type: Array,
        default: []
      },
      authorId: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("Blogs", blogSchema);