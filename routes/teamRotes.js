const express = require("express");
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controller/teamController");
const { protect } = require("../middleware/userAuth");


const teamRouter = express.Router();

// GET  → fetch all team members
teamRouter.get("/", getAllTeamMembers);

// POST → new team member add
teamRouter.post("/", protect, createTeamMember);

// PUT  → team member update
teamRouter.put("/:id", protect,  updateTeamMember);

// DELETE → team member delete
teamRouter.delete("/:id", protect, deleteTeamMember);

module.exports = teamRouter;