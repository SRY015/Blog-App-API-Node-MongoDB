const router = require("express").Router();
const Image = require("../Models/image.model");

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let image = new Image({
      url: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await image.save();
    res.status(201).json({
      success: true,
      message: "Image is uploaded successfully !!",
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server",
      error: error.message,
    });
  }
});

module.exports = router;
