const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Multer ki storage engine seedha Cloudinary pe upload karti hai, local disk pe kuch save nahi hota
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "egency-digital",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;