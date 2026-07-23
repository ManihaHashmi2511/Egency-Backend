const WhatWeDo = require('../model/whatWeDoModel');
const logActivity = require('../utils/logActivity');

// GET all cards (order ke hisaab se sorted)
const getAllWhatWeDo = async (req, res) => {
    try {
        const cards = await WhatWeDo.find().sort({ order: 1 });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new card
const createWhatWeDo = async (req, res) => {
    try {
        const { title, desc, image, order } = req.body;
        const card = await WhatWeDo.create({ title, desc, image, order });
        await logActivity({ req, action: "created", module: "whatwedo", description: `Added card "${req.body.title}"` });
        res.status(201).json({ message: "Card created successfully", card });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT update a card (order change karne ke liye bhi yehi use hoga)
const updateWhatWeDo = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await WhatWeDo.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Card not found" });
        }
        await logActivity({ req, action: "updated", module: "whatwedo", description: `Updated card "${req.body.title}"` });
        res.status(200).json({ message: "Card updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a card
const deleteWhatWeDo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await WhatWeDo.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Card not found" });
        }
        await logActivity({ req, action: "deleted", module: "whatwedo", description: `Deleted card "${deleted.title}"` });
        res.status(200).json({ message: "Card deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllWhatWeDo,
    createWhatWeDo,
    updateWhatWeDo,
    deleteWhatWeDo
};