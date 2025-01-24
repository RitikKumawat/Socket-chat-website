const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

exports.protectRoute = async(req,res,next)=>{
    try {
        let token = req.cookies.jwt || req.body.token || req.header("Authorization").replace("Bearer ","");
        // token = JSON.stringify(token);
        // console.log("TOKEN IN middleware",token);
        if(!token){
            return res.status(401).json({error:"Unauthorized- No token provided"})
        }
        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        // console.log("DECODED",decoded);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized- Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectroute middleware",error.message);
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}