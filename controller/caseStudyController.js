const CaseStudy = require('../model/caseStudyModel');

// GET all case studies (order ke hisaab se sorted)
const getAllCaseStudies = async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find().sort({ order: 1 });
        res.status(200).json(caseStudies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET single case study by ID (CaseStudyDetail page ke liye)
const getCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        const caseStudy = await CaseStudy.findById(id);
        if (!caseStudy) {
            return res.status(404).json({ message: "Case study not found" });
        }
        res.status(200).json(caseStudy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new case study
const createCaseStudy = async (req, res) => {
    try {
        const { title, category, desc, about, image, gallery, client, duration, result, services, order } = req.body;
        const caseStudy = await CaseStudy.create({ title, category, desc, about, image, gallery, client, duration, result, services, order });
        res.status(201).json({ message: "Case study created successfully", caseStudy });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT update a case study
const updateCaseStudy = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await CaseStudy.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Case study not found" });
        }
        res.status(200).json({ message: "Case study updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a case study
const deleteCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CaseStudy.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Case study not found" });
        }
        res.status(200).json({ message: "Case study deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllCaseStudies,
    getCaseStudyById,
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy
};