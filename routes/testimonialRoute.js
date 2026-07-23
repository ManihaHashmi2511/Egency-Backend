const express = require("express");
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/testimonialController");
const { protect } = require("../middleware/userAuth");


const testimonialRouter = express.Router();

// GET  → fetch all testimonials
testimonialRouter.get("/", getAllTestimonials);

// POST → new testimonial add 
testimonialRouter.post("/", protect, createTestimonial);

// PUT  → testimonial update 
testimonialRouter.put("/:id", protect, updateTestimonial);

// DELETE → testimonial delete 
testimonialRouter.delete("/:id", protect, deleteTestimonial);

module.exports = testimonialRouter;