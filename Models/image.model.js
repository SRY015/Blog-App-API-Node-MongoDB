const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
  url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Image", imgSchema);
