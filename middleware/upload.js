const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Multer's storage engine configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "egency-digital",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;