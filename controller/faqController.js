const FAQ = require('../model/faqModel');

// GET all FAQs
const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new FAQ
const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await FAQ.create({ question, answer });
        res.status(201).json({ message: "FAQ created successfully", faq });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT update a FAQ
const updateFAQ = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "FAQ not found" });
        }
        res.status(200).json({ message: "FAQ updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a FAQ
const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await FAQ.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "FAQ not found" });
        }
        res.status(200).json({ message: "FAQ deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ
};