// step: 1
const http = require("http")

// step: 2
const server = http.createServer((req,res)=>{
    // step: 4
    res.end("Hello there from the server");
})

// step: 3
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
