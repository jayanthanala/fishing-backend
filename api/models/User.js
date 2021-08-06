const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String, 
    required: true,
    min: 8
  },
  locations:[{
    type:String
  }],
  fishNames:[{
    type:String
  }]
})

module.exports = mongoose.model('Users', userSchema)