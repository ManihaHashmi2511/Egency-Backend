const express = require("express");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../controller/servicesController");

const serviceRouter = express.Router();

// GET  → fetch all services (order ke hisaab se sorted)
serviceRouter.get("/", getAllServices);

// POST → new service add
serviceRouter.post("/", createService);

// PUT  → service update (order change karne ke liye bhi yehi use hoga)
serviceRouter.put("/:id", updateService);

// DELETE → service delete
serviceRouter.delete("/:id", deleteService);

module.exports = serviceRouter;