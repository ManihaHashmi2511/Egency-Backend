const express = require("express");
const {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} = require("../controller/caseStudyController");
const { protect } = require("../middleware/userAuth");


const caseStudyRouter = express.Router();

// GET  → fetch all case studies (order ke hisaab se sorted)
caseStudyRouter.get("/", getAllCaseStudies);

// GET  → fetch single case study by ID
caseStudyRouter.get("/:id", getCaseStudyById);

// POST → new case study add
caseStudyRouter.post("/", protect, createCaseStudy);

// PUT  → case study update
caseStudyRouter.put("/:id", protect,  updateCaseStudy);

// DELETE → case study delete
caseStudyRouter.delete("/:id", protect, deleteCaseStudy);

module.exports = caseStudyRouter;