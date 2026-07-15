const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: false,
      default: 0, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);