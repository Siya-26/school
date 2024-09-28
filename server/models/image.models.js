const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }
  });
  const Images = mongoose.model('Image', ImageSchema);

  module.exports = Images;