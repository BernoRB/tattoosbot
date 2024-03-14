const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }) // esto pone el createdAt y updatedAt

const User = mongoose.model('User', userSchema)

module.exports = User
