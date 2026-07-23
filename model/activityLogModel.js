const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    module: { type: String, required: true },
    description: { type: String, required: true },
    performedByName: { type: String, required: true },
    performedByRole: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
