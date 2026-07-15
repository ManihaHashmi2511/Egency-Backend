const User = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGIN - sabke liye (role check nahi, jo bhi valid ho login kar sakta hai)
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Login hote hi status "online" set kar do
    user.status = "online";
    await user.save();

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            permissions: user.permissions,
        },
        message: 'Login successful'
    });
};

// LOGOUT - status ko wapas offline karega
const userLogout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.status = "offline";
            await user.save();
        }
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET ALL STAFF - sirf Super Admin dekh sakta hai (Settings > Manage Team)
const getAllStaff = async (req, res) => {
    try {
        const staff = await User.find().select("-password");
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE STAFF - sirf Super Admin naya Admin/User/Student bana sakta hai
const createStaff = async (req, res) => {
    const { name, email, password, phone, role, permissions } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const staff = await User.create({
            name, email, phone,
            password: hashedPassword,
            role,
            permissions,
        });

        res.status(201).json({ message: 'Staff member created successfully', staff });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// UPDATE STAFF - sirf Super Admin kisi bhi staff ka role/permissions/details change kar sakta hai
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;

        // Agar password bhi bheja hai to hash karo
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const update = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
        if (!update) {
            return res.status(404).json({ message: "Staff member not found" });
        }
        res.status(200).json({ message: "Staff member updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE STAFF - sirf Super Admin
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        // Super Admin khud ko delete na kar sake
        const userToDelete = await User.findById(id);
        if (userToDelete && userToDelete.role === "superadmin") {
            return res.status(400).json({ message: "Super Admin account cannot be deleted" });
        }

        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Staff member not found" });
        }
        res.status(200).json({ message: "Staff member deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE OWN PROFILE - koi bhi logged-in user (apna naam/email/phone)
const updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const update = await User.findByIdAndUpdate(
            req.user._id,
            { name, email, phone },
            { new: true }
        ).select("-password");

        res.status(200).json({ message: "Profile updated successfully", update });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// CHANGE OWN PASSWORD - koi bhi logged-in user
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    userLogin,
    userLogout,
    getAllStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    updateProfile,
    changePassword,
};