const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  stlye: {
    type: String,
    required: false,
    default: 'Not Selected'
  },
  prompt: {
    type: String,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: false,
    default: false
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
