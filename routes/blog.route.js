const router = require("express").Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs,
} = require("../controller/blog.controller");

// CREATE BLOG --->
router.post("/create", createBlog);

// UPDATE BLOG --->
router.put("/:id", updateBlog);

// DELETE BLOG --->
router.delete("/:id", deleteBlog);

// GET BLOG BY ID --->
router.get("/:id", getBlogById);

// GET ALL BLOGS --->
router.get("/", getAllBlogs);

module.exports = router;
