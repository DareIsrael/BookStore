const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc   Create a new video
// @route  POST /api/videos
// @access Admin
// controllers/videoController.js
exports.createVideo = async (req, res) => {
  try {
    const { title, description, price, currency, videoUrl } = req.body;

    if (!req.files || !req.files.introVideo) {
      return res.status(400).json({ message: "Intro video is required" });
    }

    // ✅ Upload intro video
    const videoResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "videos", resource_type: "video" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      streamifier.createReadStream(req.files.introVideo[0].buffer).pipe(stream);
    });

    // ✅ Upload PDF if provided
    let pdfResult = null;
    if (req.files.pdf) {
      pdfResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pdfs", resource_type: "raw" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        streamifier.createReadStream(req.files.pdf[0].buffer).pipe(stream);
      });
    }

    const newVideo = new Video({
      title,
      description,
      price: parseFloat(price),
      currency,
      introVideo: videoResult.secure_url,
      videoUrl,
      pdf: pdfResult ? pdfResult.secure_url : null, // ✅ save PDF URL
    });

    await newVideo.save();
    res.status(201).json({ success: true, data: newVideo });
  } catch (err) {
    console.error("Create Video Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// @desc   Get all videos
// @route  GET /api/videos
// @access Public
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ success: true, count: videos.length, data: videos });
  } catch (err) {
    console.error("Get Videos Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc   Get single video
// @route  GET /api/videos/:id
// @access Public (paid users see full video)
// req.user optional (if logged in)
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });

    const videoData = video.toObject();
    videoData.fullVideoUrl = null; // default hide

    // ✅ Reveal full video only for paid users
    if (req.user) {
      const order = await require("../models/Order").findOne({
        userId: req.user.id,
        "videos.videoId": video._id,
        paymentStatus: "completed",
      });

      if (order) videoData.fullVideoUrl = video.videoUrl;
    }

    res.json({ success: true, data: videoData });
  } catch (err) {
    console.error("Get Video Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc   Update a video
// @route  PUT /api/videos/:id
// @access Admin
exports.updateVideo = async (req, res) => {
  try {
    const { title, description, price, currency, videoUrl } = req.body;
    const updateData = {
      title,
      description,
      price: parseFloat(price),
      currency,
      videoUrl: videoUrl || null,
    };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "videos", resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      updateData.introVideo = result.secure_url;
    }

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedVideo) return res.status(404).json({ success: false, message: "Video not found" });

    res.json({ success: true, data: updatedVideo });
  } catch (err) {
    console.error("Update Video Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc   Delete a video
// @route  DELETE /api/videos/:id
// @access Admin
exports.deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ success: false, message: "Video not found" });

    res.json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete Video Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Helper for Admin Summary
exports.getVideosCount = async () => {
  return await Video.countDocuments();
};
