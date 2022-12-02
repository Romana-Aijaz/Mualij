//therapist Schema
const mongoose = require("mongoose");
const therapistSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true, 
        unique: true
      },
      slots: {
        type: Object,
        default: null,
      },
      price: {
        type: Number,
        default: null
      },
      pendingSchedules: {
        type: Array,
        default: [],
      },
      completedSessions: {
        type: Array,
        default: [],
      },
      reviews: {
        type: Array,
        default: []
      },
      rating: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  );
  module.exports = mongoose.model("Therapists", therapistSchema);