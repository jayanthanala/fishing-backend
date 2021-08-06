const validator = require("validator");
const User = require("../models/User");
const {Findings, Trip} = require("../models/Trip");
const bcrypt = require('bcrypt');

exports.addTrip = async (req,res) => {
  const {location,date,time,totalHours,tripCost,amtrecovered,fishingVessel,result} = req.body;
  try{
    if (!location || !date || !time || !totalHours || !tripCost || !amtrecovered || !fishingVessel){
      throw new Error("Please fill the required fields");
    } //findings validation should be checked on the frontend!!
    
    let temp;
    let findings = [];
    
    const newTrip = {
      user: req.user._id,
      location,
      date,
      time,
      totalHours,
      tripCost,
      amtrecovered, 
      fishingVessel,
      findings
    }
    
    let trip = await Trip.create(newTrip);

    if(result){
      for(let i of result){
        temp = await Findings.create(i)
        trip.findings.push(temp);
      }
      const newAction = await trip.save();
    
      res.status(200).json({
        "message":"Trip Info Added with Findings",
      })
    }else{
      res.status(200).json({
        "message":"Trip Info Added without any findings",
      })
    }
  }catch(err){
    console.log(err);
    res.status(500).json({
      "Error":err.toString()
    })
  }
}

exports.dashboardInfo = async(req,res) => {
  const user = req.user;
  try{
    let fullData = await Trip.find({user:user._id}).lean();
    if(!fullData.length) res.status(200).json('No Data Found')
    let totalHours = 0,fishingTrips = 0,fishCaught = fullData.length ,amtSpent = 0,amtRecovered=0,fishGraph;
    for(let d of fullData){
      totalHours += d.totalHours
      amtSpent += d.tripCost
      amtRecovered += d.amtrecovered
      for(let f of d.findings){
        fishCaught += f.quantity
      }
    }
    await res.status(200).json({
      "dashData":{
        totalHours,
        amtRecovered,
        amtSpent,
        fishCaught,
        fishingTrips
      },fullData})
  }catch(err){
    console.log(err);
    res.status(500).json({
      "Error":err.toString()
    })
  } 
}

