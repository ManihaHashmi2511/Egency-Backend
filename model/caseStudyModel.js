const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String, // grid card ke liye short description
      required: true,
    },
    about: {
      type: String, // detail page ke liye long description
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    gallery: {
      type: [String],
      default: [],
    },
    client: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    result: {
      type: String, // jaise "40% brand recognition increase"
      required: false,
    },
    services: {
      type: [String], // jaise ["Logo Design", "Brand Guidelines"]
      default: [],
    },
    order: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseStudy", caseStudySchema);