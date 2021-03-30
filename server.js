const express = require('express');
const socket = require('socket.io');

//app setup

const PORT = 3000;

const app = express();

const server = app.listen(PORT, () =>{
    console.log('listening on port '+PORT);
    console.log('http://localhost:' + PORT);
})

//static file
app.use(express.static("public"));

//socket setup

const io = socket(server);

io.on("connection",function (socket)  {
    console.log("made socket connection")
})