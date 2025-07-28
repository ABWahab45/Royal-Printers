const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ["image", "video", "document"], required: true },
  filePath: String, // Path to the file in the uploads directory
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Media", MediaSchema);
