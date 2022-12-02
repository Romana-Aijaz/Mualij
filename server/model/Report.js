const mongoose = require("mongoose");
//reports schema.
const reportSchema = new mongoose.Schema(
  {
    reporterId: { type: String, default: "", required: true},
    therapistId: { type: String, default: ""},
    userId: {type: String, default: ""},
    groupId: { type: String, default: ""},
    postId: {type: String, default: ""},
    groupPostId: { type: String, default: ""},
    type: {type: String, default: "", required: true},
    reasonOfReporting: {type: String, default: ""},
    status: {type: String, default: "pending"}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Reports", reportSchema);