const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports = async (req,res,next)=>{
    try{
        if (!req.headers.authorization) throw new Error('No Auth Header Found')
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const user = await User.findOne({_id:decoded._id}).select("-password")
        if(!user) throw new Error("Token not valid, No account found!")
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