const express = require("express");
const {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controller/faqController");
const { protect } = require("../middleware/userAuth");


const faqRouter = express.Router();

// GET  → fetch all FAQs
faqRouter.get("/", getAllFAQs);

// POST → new FAQ add
faqRouter.post("/", protect, createFAQ);

// PUT  → FAQ update
faqRouter.put("/:id", protect, updateFAQ);

// DELETE → FAQ delete
faqRouter.delete("/:id", protect, deleteFAQ);

module.exports = faqRouter;