const Contact = require('../model/contactModel');
const sendContactNotification = require('../utils/sendEmail');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        if (!phone || phone.replace(/\D/g, "").length < 10) {
            return res.status(400).json({ message: "Please provide a valid phone number" });
        }

        const contact = await Contact.create({ name, email, phone, message });

        try {
            await sendContactNotification({ name, email, phone, message });
        } catch (emailError) {
            console.log("Email sending failed:", emailError.message);
        }

        res.status(201).json({ message: "Message sent successfully! We'll get back to you soon.", contact });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message updated successfully", update });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
};