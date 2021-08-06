const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  user:{type:String},
  location:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  totalHours:{
    type:Number,
    required:true
  },
  tripCost:{
    type:Number,
    required:true,
    min:1
  },
  amtrecovered:{
    type:Number,
    required:true,
    min:1
  },
  fishingVessel:{
    type:Boolean,
    required:true,
    default:false
  },
  
})