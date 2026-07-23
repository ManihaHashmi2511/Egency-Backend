const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const { protect } = require("../middleware/userAuth");


const blogRouter = express.Router();

// GET  → fetch all blogs
blogRouter.get("/", getAllBlogs);

// GET  → fetch single blog by ID
blogRouter.get("/:id", protect, getBlogById);

// POST → new blog add
blogRouter.post("/",  protect, createBlog);

// PUT  → blog update
blogRouter.put("/:id",  protect, updateBlog);

// DELETE → blog delete
blogRouter.delete("/:id",  protect, deleteBlog);

module.exports = blogRouter;