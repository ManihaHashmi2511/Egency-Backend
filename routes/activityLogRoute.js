const express = require("express");
const { getRecentActivity } = require("../controller/activityLogController");
const { protect, authorize } = require("../middleware/userAuth");

const activityLogRouter = express.Router();

activityLogRouter.get("/", protect, authorize("superadmin"), getRecentActivity);

module.exports = activityLogRouter;