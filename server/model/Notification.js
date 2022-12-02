const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        default: "",
    },
    conversationId: {
        type: String,
        default: "",
    },
    groupPostId: {
      type: String,
      default: "",
    },
    groupId: {
      type: String,
      default: "",
    },
    scheduleId: {
        type: String,
        default: "",
    },
    notificationType: {
      type: Number,
      required: true,
    },
    seen: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", notificationSchema);