const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.get("/",(req,res)=>{
    res.send("Hello there")
})

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message:"Notes Created Successfully"
    })
})

app.get("/notes",(req,res)=>{
    res.json(notes);
})

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.json({
        message:"Notes Deleted Successfully"
    })
})

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    const {title} = req.body
    notes[index].title = title
    res.json({
        message:"Note Updated Successfully"
    })
})

app.listen(3000,(req,res)=>{
    console.log("Server started on port 3000");
})