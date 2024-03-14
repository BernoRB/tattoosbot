const express = require('express')
const router = express.Router()
const imageController = require('../controllers/image.controller')
const userController = require('../controllers/user.controller')

router.post('/generateImage', imageController.generateImage)
router.post('/userLoggedIn', userController.newLogIn)
router.post('/getUserImages', imageController.getUserImages)

module.exports = router