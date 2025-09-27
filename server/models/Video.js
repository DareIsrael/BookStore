const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    introVideo: { type: String }, // Cloudinary image
    videoUrl: { type: String },  // actual hosted video link (optional, sent later)
    price: { type: Number, required: true },
    currency: { type: String, default: "usd" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
