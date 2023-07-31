const MyError = require ("../utils/MyError")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');

exports.Logger = asyncHandler(async (req, res, next) => {
    const testToken = req.headers.authorization;
    let token;
    if (!testToken) {
        return res.status(400).json({
            success: false
        });
    }
    token = testToken.split(' ')[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: verifiedToken.id });
        req.userId = user.id;
        req.userEmail = user.email;
    next();
});

exports.shield=asyncHandler(async(req,res,next)=>{

    if(!req.headers.authorization){
        throw new MyError ("You have to be Admin,  Please login!" , 401)
    }
    
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        throw new MyError ("There is no Token" , 400)
    }
    const object = jwt.verify(token, process.env.JWT_SECRET);

    console.log(object)
    req.userId = object.id;
    req.userRole = object.role;


    next();
});