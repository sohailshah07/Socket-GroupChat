const express = require('express');
const socket = require('socket.io');
const path = require('path');
//app setup

const PORT = 3000;
const app = express();

const server = app.listen(PORT, () =>{
    console.log('listening on port '+PORT);
    console.log('http://localhost:' + PORT);
})

//static file
app.use(express.static("./public"));

//socket setup

const io = socket(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + './public/index.html');
})

var name;

io.on("connection",function (socket)  {
    console.log("new user connected")
    
    socket.on('joining message',(userName) => {
        name = userName;
        io.emit('chat message',`---${name} joined the chat---`);
    });

    socket.on('disconnect',() => {
        console.log("user disconnect")
        io.emit('chat message',`---${name} left the chat---`);
    });

    socket.on('chat message',(msg)=> {
        socket.broadcast.emit('chat message',msg)
    });

    socket.on('typing',()=>{
        console.log("user typing")
        socket.broadcast.emit(`${name} is typing ..`)
    })
})
