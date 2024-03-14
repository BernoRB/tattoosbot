const axios = require('axios')
const config = require('../config/config')
const Image = require('../models/image.model')

async function generateImage(text, style, uid, email) {
  try {
    /*
    const prompt = `
    A tattoo design ready to be tattooed by the artist, 
    executed in ${style} tattoo style 
    that incorporates ${text}. 
    `
    */
   const prompt = `${text} tattoo design idea in ${style} style`

    console.log('*****************')
    console.log(prompt)
    console.log('*****************')
    console.log(uid)
    console.log(email)

    // Primer request para generar la imagen
    let options = {
      method: 'POST',
      url: 'https://api.prodia.com/v1/sd/generate',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'X-Prodia-Key': config.ai_api_key
      },
      data: {
        model: 'absolutereality_v181.safetensors [3d9d4d2b]',
        prompt: prompt,
        negative_prompt: 'skin, body, limbs, arms, legs, feet, hands, torso, neck, head',
        steps: 20,
        cfg_scale: 7,
        seed: -1,
        upscale: false,
        sampler: 'DPM++ 2M Karras',
        width: 512,
        height: 512            
      }
    }

    const response = await axios.request(options)
    const { job } = response.data

    // Función que espera un tiempo específico
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

    // Función para consultar el estado del job
    async function checkJobStatus() {
      let checkOptions = {
        method: 'GET',
        url: `https://api.prodia.com/v1/job/${job}`,
        headers: {
          'accept': 'application/json',
          'X-Prodia-Key': config.ai_api_key
        }
      }

      while (true) {
        const statusResponse = await axios.request(checkOptions)
        const { status, imageUrl } = statusResponse.data

        if (status === 'succeeded') {
          return { status, imageUrl }
        } else if (status == 'failed') {
          throw new Error('Job failed')
        }

        // Esperar antes de la próxima comprobación
        await wait(5000) // Espera 5 segundos antes de volver a intentar
      }
    }


    // Guardo imagen en database y devuelvo
    const { status, imageUrl } = await checkJobStatus()
    if (status === 'succeeded') {
      // Genero el objeto de la nueva imagen y lo guardo
      const newImage = new Image({
        userEmail: email,
        uid: uid,
        url: imageUrl,
        status: status,
        style: style,
        prompt: prompt,
        createdAt: new Date(),
      })
      await newImage.save()
  
      return { status, imageUrl };
    }

  } catch (error) {
    console.error('Error generating image:', error)
    return { error: error.message }
  }
}

getUserImages = async (uid) => {  
  return await Image.find({ uid: uid })
}

module.exports = { generateImage, getUserImages }
