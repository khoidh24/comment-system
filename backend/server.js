const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3001

// Middleware
app.use(bodyParser.json())
app.use(cors())

// MongoDB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kblayct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

// Routes
const postRoutes = require('./routes/post.routes')
app.use('/posts', postRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
