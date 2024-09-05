const Category = require("../Models/category.model");

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "New category is created successfully !!",
      newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server !!",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories found successfully !!",
      allCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something broke in the server !!",
      error: error.message,
    });
  }
};

module.exports = { createCategory, getAllCategories };
