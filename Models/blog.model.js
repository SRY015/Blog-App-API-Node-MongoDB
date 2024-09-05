const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
