// routes/health.js
const express = require("express");
const router = express.Router();
const { getHealthStatus } = require("../controllers/healthController");

// GET /health
router.get("/", getHealthStatus);

module.exports = router;
