const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const blogRouter = express.Router();

// GET  → fetch all blogs
blogRouter.get("/", getAllBlogs);

// GET  → fetch single blog by ID
blogRouter.get("/:id", getBlogById);

// POST → new blog add
blogRouter.post("/", createBlog);

// PUT  → blog update
blogRouter.put("/:id", updateBlog);

// DELETE → blog delete
blogRouter.delete("/:id", deleteBlog);

module.exports = blogRouter;