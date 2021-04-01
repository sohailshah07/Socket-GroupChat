const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =socketio(server);
const dotenv = require('dotenv');
dotenv.config();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when a clint connect

io.on('connection', socket => {

    //welcome currenrt user
    socket.emit('message', 'welcome to ChatCord');

    //Broadcast when a user connect
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when the clint disconnect
    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the chat');
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT,() => {
    console.log('listening on port '+ PORT);
    console.log('http://localhost:'+PORT);
})
