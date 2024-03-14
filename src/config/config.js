require('dotenv').config()
module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/tattoobot',
    ai_api_key: process.env.PRODIA_API_KEY
}