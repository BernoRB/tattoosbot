const imageService = require('../services/image.service')

generateImage = async (req, res) => {
    const { text, style, uid, email } = req.body
    const result = await imageService.generateImage(text, style, uid, email)
    res.json(result)
}

getUserImages = async (req, res) => {
    const { uid } = req.body
    try {
      const images = await imageService.getUserImages(uid)
      res.json({ images })
    } catch (error) {
      res.status(500).send({ message: 'Error al obtener las imágenes del usuario' })
    }
  }
  

module.exports = { generateImage, getUserImages }