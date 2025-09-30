const express = require('express');
const userModel = require("../models/user.model");

const router = express.Router();

router.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    const userDetails = await userModel.create({
        username, password
    })

    res.json({
        message: "User registered successfully",
        userDetails
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

module.exports = router;
