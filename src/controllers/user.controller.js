const userService = require('../services/user.service')

newLogIn = async (req, res) => {
  const { email, uid } = req.body
  try {
    // Verificamos que el usuario exista o no en la db
    let user = await userService.checkUserExists(uid)

    if (!user) {
      user = await userService.registerNewUser({ email, uid })
      res.json({ message: 'Nuevo usuario registrado', user })
    } else {
      user = await userService.updateNewUser(user)
      res.json({ message: 'Fecha de último inicio de sesión actualizada', user })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor.')
  }
}

module.exports = { newLogIn }