const User = require("../Models/auth.model");
const bcrypt = require("bcrypt");
const { deleteBlogsByEmail } = require("./blog.controller");
const fs = require("fs");

// GET USER BY ID --->
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json({
        success: true,
        message: "User found successfully !!",
        user: others,
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
      message: "Something broke in the server !!",
      error: error.message,
    });
  }
};

// UPDATE USER --->
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...otherDetails } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User has updated successfully !!",
      user: otherDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server !!",
      error: error.message,
    });
  }
};

// DELETE USER --->
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user.profilePic) {
      fs.unlinkSync(__dirname + `/../Images/${user.profilePic}`);
    }
    await deleteBlogsByEmail(user.email);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User has been deleted successfully !!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server !!",
      error: error.message,
    });
  }
};

module.exports = { getUserById, updateUser, deleteUser };
