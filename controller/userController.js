const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logActivity = require("../utils/logActivity");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  user.status = "online";
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
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
      profileImg: user.profileImg,
    },
    message: "Login successful",
  });
};

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

const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find().select("-password");
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStaff = async (req, res) => {
  const { name, email, password, phone, role, permissions, profileImg } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      permissions,
      profileImg,
    });
    await logActivity({
      req,
      action: "created",
      module: "staff",
      description: `Created new ${role} account for "${name}"`,
    });

    res
      .status(201)
      .json({ message: "Staff member created successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const update = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!update) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    const roleChanged = req.body.role ? ` (role: ${req.body.role})` : "";
    await logActivity({
      req,
      action: "updated",
      module: "staff",
      description: `Updated staff member "${update.name}"${roleChanged}`,
    });
    res
      .status(200)
      .json({ message: "Staff member updated successfully", update });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findById(id);
    if (userToDelete && userToDelete.role === "superadmin") {
      return res
        .status(400)
        .json({ message: "Super Admin account cannot be deleted" });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    await logActivity({ req, action: "deleted", module: "staff", description: `Deleted staff member "${userToDelete.name}"` });
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, profileImg } = req.body;

    const update = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone, profileImg },
      { new: true },
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully", update });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

    await logActivity({ req, action: "password_changed", module: "staff", description: `${user.name} changed their own password` });

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
