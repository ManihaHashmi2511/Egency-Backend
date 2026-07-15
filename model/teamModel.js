const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);