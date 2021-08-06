const mongoose = require('mongoose')

const fishSchema = new mongoose.Schema({
  fishName:{
    type:String,
    required:true
  },
  fishSize:{
    type:String,
    required:true
  },
  fishSizeInch:{
    type:Number,
    required:true
  },
  fishWeight:{
    type:String,
    required:true
  },
  fishWeightKg:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  approxCost:{
    type:Number,
    required:true
  },
  weatherCondition:{
    type:String,
    required:true
  },
  windCondition:{
    type:String,
    required:true
  },
  tideCondition:{
    type:String,
    required:true
  },
  tideIntenstiy:{
    type:String,
    required:true
  },
  waterTemp:{
    type:String,
    required:true
  },
  waterTexture:{
    type:String
  },
  moonStage:{
    type:String
  },
  moonStatus:{
    type:String
  },
  equipmentUsed:{
    type:String,
    required:true
  },
  note:{
    type:String
  }
})

const tripSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Users', 
    required:true
  },
  location:{
    type:String,
    required:true
  },
  date:{
    type:String,
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
  findings:[{
    type: fishSchema,
    default: []
  }]
});



const Trip = mongoose.model('Trip', tripSchema)
const Findings = mongoose.model('Findings',fishSchema)
module.exports = {Trip, Findings};