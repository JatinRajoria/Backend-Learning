require("dotenv").config();
const express = require('express')
const connectToDB = require('./src/db/db')

connectToDB();

const app = express();
app.use(express.json())

const booksdata = []

app.get('/', (req,res)=>{
    res.send("Hello there")
})

app.post('/books',(req,res)=>{
    console.log(req.body);
    booksdata.push(req.body)
   res.json({
    message: "Books Added Successfully",
    books: booksdata
   }) 
})

app.get("/books",(req,res)=>{
    res.json(booksdata);
})

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})