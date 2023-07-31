const User = require("../models/userModel");
const MyError = require("../utils/MyError");
const asyncHandler = require("../middlewares/asyncHandler");

exports.register=asyncHandler(async(req,res)=>{
    const user = await User.create(req.body)
    const token = user.getJWT()
    res.status(200).json({
        success:true,
        token,
        user:user
    });
});

exports.login=asyncHandler(async(req,res)=>{
    const {email, password}=req.body

    if(!email || !password){
        throw new MyError("Email, nuuts ugee orul", 400) }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new MyError("Email, nuuts ugee zuw orul", 401)}
    const check = await user.checkPassword(password)
    if(!check) {
        throw new MyError("Email, nuuts ugee zuw orul", 401)}
    const jwt =user.getJWT()
    res.status(200).json({
        success:true,
        token:user.getJWT(),
        user:user
    });
});