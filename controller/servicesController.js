const Service = require('../model/serviceModel');
const logActivity = require('../utils/logActivity');

// GET all services (order ke hisaab se sorted)
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 }); // ascending order
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST create a new service
const createService = async (req, res) => {
    try {
        const { title, desc, image, order } = req.body;
        const service = await Service.create({ title, desc, image, order });
        await logActivity({ req, action: "created", module: "services", description: `Added service "${req.body.title}"` });
        res.status(201).json({ message: "Service created successfully", service });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

const updateService = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Service not found" });
        }
        await logActivity({ req, action: "updated", module: "services", description: `Updated service "${req.body.title}"` });
        res.status(200).json({ message: "Service updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

// DELETE a service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Service not found" });
        }
        await logActivity({ req, action: "deleted", module: "services", description: `Deleted service "${deleted.title}"` });
        res.status(200).json({ message: "Service deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllServices,
    createService,
    updateService,
    deleteService
};