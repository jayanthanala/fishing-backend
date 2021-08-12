
const validator = require("validator");
const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) throw new Error('Required data not provided')
    if (password.length<8) throw new Error('Password should be minimum of 8 letters')
    const searchedUser = await User.findOne({email}).select("-password")

    if (searchedUser) { throw new Error(`Email is already registered!`) }

    const hashpass = await bcrypt.hash(password,10)

    if (!validator.isEmail(email)) throw new Error('Email format is incorrect')

    if (password.length < 8) throw new Error('Password must have atleast than 8 chars')

    const user = await User.create({
      name,
      email,
      password: hashpass 
    })

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    res.status(200).json({
      token,
      userDetails: {
        name,
        email
      }
    })
  } catch (e) {
    console.log(e)
    res.status(e.status || 500).json('message':e.message);
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Required data not provided')
    if (password.length<8) throw new Error('Wrong Password')
    const user = await User.findOne({email})
    if (!user) { throw new Error('Email is not registered!') }
    const hashpass = await bcrypt.compare(password, user.password)

    if (!hashpass) throw new Error('Password is incorrect!')

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    res.status(200).json({
      token,
      userDetails: {
        email
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message:e.toString()
    })
  }
}

exports.regConfig = async(req,res) => {

}
