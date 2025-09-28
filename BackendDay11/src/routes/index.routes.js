const express = require('express');

const router = express.Router();

router.use((req,res,next)=>{
    console.log("This middleware is between router and api");
    next();
})

router.get('/', (req,res)=>{
    res.json({
        message: "This message shown only if we use next in middleware cause it completes the working flow"
    })
})

module.exports = router;