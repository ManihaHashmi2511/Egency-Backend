const Blog = require('../model/blogModel');
const logActivity = require('../utils/logActivity');

// GET all blogs (newest first)
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET single blog by ID (BlogDetail page ke liye)
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, desc, image, author, authorImg, authorRole, category, tags, readTime, date, featured, content } = req.body;
        const blog = await Blog.create({ title, desc, image, author, authorImg, authorRole, category, tags, readTime, date, featured, content });
        await logActivity({ req, action: "created", module: "blog", description: `Published blog "${req.body.title}"` });
        res.status(201).json({ message: "Blog created successfully", blog });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT update a blog
const updateBlog = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await logActivity({ req, action: "updated", module: "blog", description: `Updated blog "${req.body.title}"` });
        res.status(200).json({ message: "Blog updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Blog.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await logActivity({ req, action: "deleted", module: "blog", description: `Deleted blog "${deleted.title}"` });
        res.status(200).json({ message: "Blog deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};