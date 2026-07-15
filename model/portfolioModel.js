const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    client: {
      type: String,
      required: false,
    },
    tools: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    liveUrl: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: false,
    },
    challenge: {
      type: String,
      required: false,
    },
    solution: {
      type: String,
      required: false,
    },
    gallery: {
      type: [String],
      default: [],
    },
    results: [
      {
        number: {
          type: String, 
          required: true,
        },
        label: {
          type: String, 
          required: true,
        },
        icon: {
          type: String, 
          required: false,
        },
      },
    ],
    order: {
      type: Number, 
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);