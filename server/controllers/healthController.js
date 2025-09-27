// controllers/healthController.js
exports.getHealthStatus = (req, res) => {
  console.log("⚡ /health endpoint was called at", new Date().toISOString());

  res.status(200).json({
    success: true,
    message: "✅ Server is awake and running",
    timestamp: new Date().toISOString(),
  });
};
