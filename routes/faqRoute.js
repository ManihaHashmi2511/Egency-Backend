const express = require("express");
const {
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controller/faqController");

const faqRouter = express.Router();

// GET  → fetch all FAQs
faqRouter.get("/", getAllFAQs);

// POST → new FAQ add
faqRouter.post("/", createFAQ);

// PUT  → FAQ update
faqRouter.put("/:id", updateFAQ);

// DELETE → FAQ delete
faqRouter.delete("/:id", deleteFAQ);

module.exports = faqRouter;