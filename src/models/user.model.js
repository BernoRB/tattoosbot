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
  countGenerations: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isPremiumSince: {
    type: Date
  },
  isPremiumUntil: {
    type: Date
  },
  quantitySubscriptions: {
    type: Number,
    default: 0
  }
}, { timestamps: true }) // esto pone el createdAt y updatedAt

const User = mongoose.model('User', userSchema)

module.exports = User
