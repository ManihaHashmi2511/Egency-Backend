const express = require("express");
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/testimonialController");

const testimonialRouter = express.Router();

// GET  → fetch all testimonials
testimonialRouter.get("/", getAllTestimonials);

// POST → new testimonial add 
testimonialRouter.post("/", createTestimonial);

// PUT  → testimonial update 
testimonialRouter.put("/:id", updateTestimonial);

// DELETE → testimonial delete 
testimonialRouter.delete("/:id", deleteTestimonial);

module.exports = testimonialRouter;