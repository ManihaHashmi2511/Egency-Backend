const express = require("express");
const upload = require("../middleware/upload");

const uploadRouter = express.Router();

// POST → ek image upload karo, Cloudinary ka permanent URL wapas milta hai
uploadRouter.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ url: req.file.path });
});

module.exports = uploadRouter;