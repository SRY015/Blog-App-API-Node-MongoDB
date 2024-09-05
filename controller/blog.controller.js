const Blog = require("../Models/blog.model");
const User = require("../Models/auth.model");

// create new blog --->
const createBlog = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json({
        success: true,
        message: "Blog has created successfully !!",
        blog: savedBlog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "You are not a valid user to perform this operation !!",
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

// update blog --->
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.email === req.body.email) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Blog has updated successfully !!",
        blog: updatedBlog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "You are not allowed to perform this operation !!",
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

// Delete blog --->
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog && blog.email === req.body.email) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Blog has deleted successfully !!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "You are not allowed to delete this blog !!",
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

// Get blog by Id --->
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json({
        success: true,
        message: "Blog found successfully !!",
        blog,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blog not found !!",
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

// Get all blogs --->
const getAllBlogs = async (req, res) => {
  const catName = req.query.cat;
  const userEmail = req.query.email;
  let blogs;
  try {
    if (userEmail) {
      blogs = await Blog.find({ email: userEmail });
    } else if (catName) {
      blogs = await Blog.find({ category: catName });
    } else {
      blogs = await Blog.find();
    }
    if (blogs) {
      res.status(200).json({
        success: true,
        message: "Blogs are found successfully !!",
        blogs,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No blogs found !!",
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

// Delete blogs by emil --->
const deleteBlogsByEmail = async (email) => {
  try {
    await Blog.deleteMany({ email: email });
    return "Blogs are deleted for this email !!";
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs,
  deleteBlogsByEmail,
};
