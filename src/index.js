const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser  = require('body-parser')
const config = require('./config/config')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

const routes = require('./routes/routes')
app.use('/api', routes)


//Database
const connectDatabase = async () => {
  try {
      await mongoose.connect(config.mongodb_uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
      console.log('Database connected Successfully')
  } catch (err) {
      console.log('Error connecting to database:', err)
  }
}
connectDatabase()


// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})