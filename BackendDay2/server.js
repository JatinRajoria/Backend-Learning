const express = require('express')

const app = express()

app.get('/home',(req,res)=>{
    res.send("Welcome to the Home Page");
})

app.get('/about',(req,res)=>{
    res.send("Welcome to the About Page");
})

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})