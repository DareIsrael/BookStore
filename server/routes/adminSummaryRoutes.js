const express = require("express");
const { getSummary } = require("../controllers/adminSummaryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("admin"), getSummary);

module.exports = router;
