const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
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
    author: {
      type: String,
      required: true,
    },
    authorImg: {
      type: String,
      required: false,
    },
    authorRole: {
      type: String, 
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    tags: {
      type: [String], 
      default: [],
    },
    readTime: {
      type: String, 
      required: false,
    },
    date: {
      type: String, 
      required: true,
    },
    featured: {
      type: Boolean, 
      default: false,
    },
    content: [
      {
        type: {
          type: String,
          enum: ["paragraph", "heading"], // sirf ye 2 types allowed
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);