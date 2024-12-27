const express  = require("express")
const user = require("../models/user")
const url = require("../models/url")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
const router = express.Router();
const secret = process.env.JWT_SECRET

router.post("/login",async(req,res)=>{
    const {userName,password} = req.body
    try{
        const User = await user.findOne({userName})
        if(!User)return res.status(404).json({msg:"Invalid Crediatials"})
        
        const valid = await bcrypt.compare(password,User.password)
        if(!valid){
            return res.status(404).json({msg:"Invalid Crediatials"})
        }

        const token = jwt.sign({userName,id:User._id},secret)

        res.status(200).json({token,userName})
        
    }catch(error){
        res.status(500).json({msg:"Internal Server Error ",error})
    }
})

router.post("/signup",async(req,res)=>{
    const {userName,password} =req.body
    try{
        const exitUser = await user.findOne({userName})
        if(exitUser){
            console.log(exitUser+" this is")
            return res.status(401).json({msg:"User already exit"})
        }
        const hasPass = await bcrypt.hash(password,10)
        const newUser = await user.create({userName,password:hasPass})
        return res.status(201).json({msg:"User has Created Succesfully"})
    }catch(error){
        res.status(500).json({msg:"Internal Server Error", error})
    }
})

router.post("/urls",async (req,res)=>{
    const {userName} = req.body
    const User = await user.findOne({userName})
    const allUrls = await url.find({ _id: { $in: User?.urls } });
    if(!allUrls)return res.json("no urls created by user")
    return res.send(allUrls)
})

module.exports = router