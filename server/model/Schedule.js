const mongoose = require("mongoose");
//Therapist schedule schema.
const scheduleSchema = new mongoose.Schema(
  {
    therapistId: { type: String, required: true},
    userId: {type: String, default: ""},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    duration: {type: String},
    day: {type: String, required: true},
    booked: {type: String, default: false}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Schedules", scheduleSchema);