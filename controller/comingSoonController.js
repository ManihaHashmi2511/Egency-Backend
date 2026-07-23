const ComingSoon = require('../model/comingSoonModel');
const logActivity = require('../utils/logActivity');

const getAllBanners = async (req, res) => {
    try {
        const banners = await ComingSoon.find().sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBanner = async (req, res) => {
    try {
        
        if (req.body.isActive) {
            await ComingSoon.updateMany({}, { isActive: false });
        }
        const banner = await ComingSoon.create(req.body);
        await logActivity({ req, action: "created", module: "comingsoon", description: `Created banner "${req.body.highlightText}"` });
        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.isActive) {
            await ComingSoon.updateMany({ _id: { $ne: id } }, { isActive: false });
        }

        const updated = await ComingSoon.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Banner not found" });
        }
        await logActivity({ req, action: "updated", module: "comingsoon", description: `Updated banner "${updated.highlightText}"` });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ComingSoon.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Banner not found" });
        }
        await logActivity({ req, action: "deleted", module: "comingsoon", description: `Deleted banner "${deleted.highlightText}"` });
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllBanners, createBanner, updateBanner, deleteBanner };