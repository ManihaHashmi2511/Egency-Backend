const express = require("express");
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

const contactRouter = express.Router();

// GET  → fetch all contact messages (Admin Panel ke liye)
contactRouter.get("/", getAllContacts);

// POST → new contact message submit (user form se)
contactRouter.post("/", createContact);

// PUT  → contact update (mark as read - Admin Panel ke liye)
contactRouter.put("/:id", updateContact);

// DELETE → contact message delete
contactRouter.delete("/:id", deleteContact);

module.exports = contactRouter;