const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports = async (req,res,next)=>{
    try{
        if (!req.headers.authorization) throw new Error('No Auth Header Found')
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.SECRET)
        const user = await User.findOne({email:decoded.email,"tokens.token":token}).select("-password")
        if(!user) throw new Error("Token not valid, No account found!")
        if(!user.emailVerified) throw new Error('Email ID not verified')
        req.user = user;
        req.token = token;
        next();
    }catch(err){
        console.log(err)
        res.status(400).json({
            error:err.toString()
        });
    }
}