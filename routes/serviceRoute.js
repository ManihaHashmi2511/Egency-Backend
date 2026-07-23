const express = require("express");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controller/servicesController");
const { protect } = require("../middleware/userAuth");


const serviceRouter = express.Router();

// GET  → fetch all services (order ke hisaab se sorted)
serviceRouter.get("/", getAllServices);

// POST → new service add
serviceRouter.post("/", protect, createService);

// PUT  → service update (order change karne ke liye bhi yehi use hoga)
serviceRouter.put("/:id", protect, updateService);

// DELETE → service delete
serviceRouter.delete("/:id", protect, deleteService);

module.exports = serviceRouter;