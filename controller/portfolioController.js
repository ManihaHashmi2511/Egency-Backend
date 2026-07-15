const Portfolio = require('../model/portfolioModel');

// GET all portfolios (order ke hisaab se sorted)
const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().sort({ order: 1 });
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET single portfolio by ID 
const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new portfolio
const createPortfolio = async (req, res) => {
    try {
        const { title, category, image, client, tools, duration, year, liveUrl, githubUrl, challenge, solution, gallery, results, order } = req.body;
        const portfolio = await Portfolio.create({ title, category, image, client, tools, duration, year, liveUrl, githubUrl, challenge, solution, gallery, results, order });
        res.status(201).json({ message: "Portfolio created successfully", portfolio });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT update a portfolio
const updatePortfolio = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.status(200).json({ message: "Portfolio updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a portfolio
const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Portfolio.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.status(200).json({ message: "Portfolio deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllPortfolios,
    getPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
};