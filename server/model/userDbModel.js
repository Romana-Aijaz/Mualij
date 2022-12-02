const mongoose = require("mongoose");
//user Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, max: 50, unique: true },
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    age: { type: Number },
    city: { type: String,max: 50, },
    occupation: { type: String, default: "" },
    password: { type: String, min: 6, max: 20, required: true },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    relationshipStatus: {type: String, default: ""},
    dateOfBirth : {type: Date, default: ""}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", userSchema);