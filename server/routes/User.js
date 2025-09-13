const express = require("express");
const { register, login, forgotPassword, resetPassword, getAllUsers  } = require("../controllers/userController");
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/", protect, authorize("admin"), getAllUsers);

module.exports = router;
