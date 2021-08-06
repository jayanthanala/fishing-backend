const validator = require("validator");
const User = require("../models/User");
const Trip = require("../models/Trip");
const bcrypt = require('bcrypt');

exports.addTrip = async (req,res) => {
  try{

  }catch(err){
    console.log(err);
    res.status(500).json({
      "Error":err.toString()
    })
  }
}

