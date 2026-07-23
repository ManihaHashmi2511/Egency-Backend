const Team = require('../model/teamModel');
const logActivity = require('../utils/logActivity');

// GET-- fetch all team members
const getAllTeamMembers = async (req, res) => {
    try {
        const team = await Team.find();
        res.status(200).json(team);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST -- create a new team member
const createTeamMember = async (req, res) => {
    try {
        const { name, role, image, linkedin } = req.body;
        const member = await Team.create({ name, role, image, linkedin });
        await logActivity({ req, action: "created", module: "team", description: `Added team member "${req.body.name}"` });
        res.status(201).json({ message: "Team member created successfully", member });
    } 
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// PUT -- update a team member
const updateTeamMember = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Team member not found" });
        }
        await logActivity({ req, action: "updated", module: "team", description: `Updated team member "${req.body.name}"` });
        res.status(200).json({ message: "Team member updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE -- remove a team member
const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Team.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Team member not found" });
        }
        await logActivity({ req, action: "deleted", module: "team", description: `Deleted team member "${deleted.name}"` });
        res.status(200).json({ message: "Team member deleted successfully" });

    } 
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
};