const Testimonial = require('../model/testimonialModel');
const logActivity = require('../utils/logActivity');

const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTestimonial = async (req, res) => {
    try {
        const { name, country, rating, review, image } = req.body;
        const testimonial = await Testimonial.create({ name, country, rating, review, image });
        await logActivity({ req, action: "created", module: "testimonials", description: `Added testimonial from ${req.body.name}` });
        res.status(201).json({ message: "Testimonial created successfully", testimonial });
        
    } catch (error) {
        res.status(500).json({  message: "Server error", error: error.message});
        
    }
}

const updateTestimonial = async (req, res) => {

    try {
        const { id } = req.params;
        const update = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        await logActivity({ req, action: "updated", module: "testimonials", description: `Updated testimonial from ${req.body.name}` });
        res.status(200).json({ message: "Testimonial updated successfully", update });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
}

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Testimonial.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        await logActivity({ req, action: "deleted", module: "testimonials", description: `Deleted testimonial from ${deleted.name}` });
        res.status(200).json({ message: "Testimonial deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
