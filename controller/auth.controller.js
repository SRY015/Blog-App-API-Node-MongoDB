const User = require("../Models/auth.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Register user ---->
const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).json({
        success: false,
        message: "User is already exists !!",
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (!err) {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });
          await newUser.save();
          res.status(201).json({
            success: true,
            message: "User is created ...",
            user: newUser,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Error occured while hashing the password",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server",
      error: error.message,
    });
  }
};

// Login user --- >
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          const { password, ...otherDetails } = user._doc;
          res.status(200).json({
            success: true,
            message: "User is logged in successfully !!",
            user: otherDetails,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Invalid email or password !!",
          });
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
