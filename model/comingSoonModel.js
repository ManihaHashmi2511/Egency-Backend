const mongoose = require("mongoose");

const comingSoonSchema = new mongoose.Schema(
  {
    highlightText: {
      type: String,
      required: true,
    },
    headingRest: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Register now!",
    },
    buttonLink: {
      type: String,
      default: "/contact",
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComingSoon", comingSoonSchema);