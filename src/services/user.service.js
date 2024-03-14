const User = require('../models/user.model')
const admin = require('firebase-admin')

async function checkUserExists(uid) {
  let user = await User.findOne({ uid })
  return user;
}

async function registerNewUser({ email, uid }) {
  let user = new User({ email, uid })
  await user.save()
  return user
}

async function updateNewUser(user) {
  user.lastLogin = Date.now()
  await user.save()
  return user
}

module.exports = { checkUserExists, registerNewUser, updateNewUser }
