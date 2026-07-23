const ActivityLog = require("../model/activityLogModel");

const getRecentActivity = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(15);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRecentActivity };