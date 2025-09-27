const express = require("express");
const {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/", protect, authorize("admin"),  upload.single("introVideo"), createVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);
router.put("/:id", protect, authorize("admin"), upload.single("introVideo"), updateVideo);
router.delete("/:id", protect, authorize("admin"), deleteVideo);

module.exports = router;


