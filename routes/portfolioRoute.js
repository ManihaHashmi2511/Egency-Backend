const express = require("express");
const {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controller/portfolioController");
const { protect } = require("../middleware/userAuth");


const portfolioRouter = express.Router();

// GET  → fetch all portfolios (order ke hisaab se sorted)
portfolioRouter.get("/", getAllPortfolios);

// GET  → fetch single portfolio by ID
portfolioRouter.get("/:id", getPortfolioById);

// POST → new portfolio add
portfolioRouter.post("/", protect, createPortfolio);

// PUT  → portfolio update
portfolioRouter.put("/:id", protect, updatePortfolio);

// DELETE → portfolio delete
portfolioRouter.delete("/:id", protect, deletePortfolio);

module.exports = portfolioRouter;