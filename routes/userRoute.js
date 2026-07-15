const express = require("express");
const {
  userLogin,
  userLogout,
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  updateProfile,
  changePassword,
} = require("../controller/userController");
const { protect, authorize } = require("../middleware/userAuth");

const router = express.Router();

// PUBLIC ROUTE - koi bhi login kar sakta hai (Super Admin, Admin, User, Student)
router.post("/login", userLogin);

// PROTECTED ROUTES - sirf logged-in log use kar sakte hain
router.post("/logout", protect, userLogout);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// SUPER ADMIN ONLY ROUTES - Manage Team (Settings page)
router.get("/staff", protect, authorize("superadmin"), getAllStaff);
router.post("/staff", protect, authorize("superadmin"), createStaff);
router.put("/staff/:id", protect, authorize("superadmin"), updateStaff);
router.delete("/staff/:id", protect, authorize("superadmin"), deleteStaff);

module.exports = router;