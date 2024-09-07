const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "username is requireed"],
  },
  email: {
    type: String,
    require: [true, "email must be entered"],
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  isAdmin: {
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", authSchema);
