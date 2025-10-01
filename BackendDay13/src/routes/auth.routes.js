const express = require('express');
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    const userDetails = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        id: userDetails._id
    },process.env.JWT_SECRET)
    res.cookie("token", token)

    res.json({
        message: "User registered successfully",
        userDetails,
    })
})

router.post('/login', async(req,res)=>{
    const {username, password} = req.body;
    const isUSerExists = await userModel.findOne({
        username: username
    })
    if(!isUSerExists){
        return res.status(401).json({
            message: "user account not found [invalid username]"
        })
    }

    const isPasswordValid = password == isUSerExists.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    res.status(200).json({
        message:"user loggedin successfully"
    })
})

router.get('/user', async (req,res)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message: "Unauthorized user [ token missing ]"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const userDetails = await userModel.findOne({
            _id: decode.id
        }).select("-password -__v")

        res.status(200).json({
            message: "user data fetched successfully",
            userDetails,
        })
    }catch(err){
        return res.status(401).json({
            message: "unauthorized user [invalid token]"
        })
    }
})

module.exports = router;
