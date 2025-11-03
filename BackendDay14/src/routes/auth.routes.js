const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const express = require('express');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ username });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userModel.create({ username, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token,{
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    })

    res.status(201).json({ message: 'User registered successfully', user });
})

// user
router.get('/user', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id: decoded.id
        }).select('-password -__v');
        res.status(200).json({
            message: 'User data fetched successfully',
            user
        })
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized invalid token' });
    }       
});

module.exports = router;