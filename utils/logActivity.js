const ActivityLog = require("../model/activityLogModel");


const logActivity = async ({ req, action, module, description }) => {
  try {
    await ActivityLog.create({
      action,
      module,
      description,
      performedByName: req.user?.name || "Unknown",
      performedByRole: req.user?.role || "unknown",
    });
  } catch (error) {
    console.log("Activity log error:", error.message);
  }
};

module.exports = logActivity;