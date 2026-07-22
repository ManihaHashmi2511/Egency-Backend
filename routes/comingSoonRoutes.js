const express = require("express");
const {
    getAllBanners,
    createBanner,
    updateBanner,
    deleteBanner,
} = require("../controller/comingSoonController");

const comingSoonRouter = express.Router();

comingSoonRouter.get("/", getAllBanners);
comingSoonRouter.post("/", createBanner);
comingSoonRouter.put("/:id", updateBanner);
comingSoonRouter.delete("/:id", deleteBanner);

module.exports = comingSoonRouter;