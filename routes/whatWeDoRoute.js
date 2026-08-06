const express = require("express");
const {
  getAllWhatWeDo,
  createWhatWeDo,
  updateWhatWeDo,
  deleteWhatWeDo,
} = require("../controller/whatWeDoController");
const { protect } = require("../middleware/userAuth");


const whatWeDoRouter = express.Router();

whatWeDoRouter.get("/", getAllWhatWeDo);

whatWeDoRouter.post("/", protect, createWhatWeDo);

whatWeDoRouter.put("/:id", protect, updateWhatWeDo);

whatWeDoRouter.delete("/:id", protect, deleteWhatWeDo);

module.exports = whatWeDoRouter;