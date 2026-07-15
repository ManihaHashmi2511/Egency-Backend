const express = require("express");
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controller/teamController");

const teamRouter = express.Router();

// GET  → fetch all team members
teamRouter.get("/", getAllTeamMembers);

// POST → new team member add
teamRouter.post("/", createTeamMember);

// PUT  → team member update
teamRouter.put("/:id", updateTeamMember);

// DELETE → team member delete
teamRouter.delete("/:id", deleteTeamMember);

module.exports = teamRouter;