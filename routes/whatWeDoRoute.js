const express = require("express");
const {
  getAllWhatWeDo,
  createWhatWeDo,
  updateWhatWeDo,
  deleteWhatWeDo,
} = require("../controller/whatWeDoController");
const { protect } = require("../middleware/userAuth");


const whatWeDoRouter = express.Router();

// GET  → fetch all cards (order ke hisaab se sorted)
whatWeDoRouter.get("/", getAllWhatWeDo);

// POST → new card add
whatWeDoRouter.post("/", protect, createWhatWeDo);

// PUT  → card update (order change karne ke liye bhi yehi use hoga)
whatWeDoRouter.put("/:id", protect, updateWhatWeDo);

// DELETE → card delete
whatWeDoRouter.delete("/:id", protect, deleteWhatWeDo);

module.exports = whatWeDoRouter;