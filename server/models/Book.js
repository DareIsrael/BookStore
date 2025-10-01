const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },       // new field
  coverImage: { type: String, required: true },   // new field, store image URL
  description: String,
  pdf: { type: String },
  price: { type: Number, required: true },       // in cents
  currency: { type: String, default: "gbp" },
  // slug: { type: String, unique: true }, // ✅ new field
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
