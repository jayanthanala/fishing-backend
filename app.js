const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
// const helmet = require('helmet')

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (!process.env.TESTING) app.use(morgan('tiny'))

// helmet
// app.use(helmet())

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Mongo
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
  if (err) {
    process.exit(2);
  }
  console.log('MongoDB connection established');
});

// ROUTES
app.use('/',require('./api/routes/auth'))
app.use('/dashboard',require('./api/routes/dashboard'))
app.use('*', async(req,res) => {
  res.send("Server Working");
})
 
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log('server started at: ' + PORT)
})