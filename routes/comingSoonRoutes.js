const express = require("express");
const {
    getAllBanners,
    createBanner,
    updateBanner,
    deleteBanner,
} = require("../controller/comingSoonController");
const { protect } = require("../middleware/userAuth");


const comingSoonRouter = express.Router();

comingSoonRouter.get("/", getAllBanners);
comingSoonRouter.post("/", protect, createBanner);
comingSoonRouter.put("/:id", protect, updateBanner);
comingSoonRouter.delete("/:id", protect, deleteBanner);

module.exports = comingSoonRouter;