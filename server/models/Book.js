const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },       // new field
  coverImage: { type: String, required: true },   // new field, store image URL
  description: String,
  price: { type: Number, required: true },       // in cents
  currency: { type: String, default: "usd" }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
