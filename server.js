const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =socketio(server);


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when a clint connect
io.on('connection', socket => {
    console.log('New WS connection ...');

    socket.emit('message', 'welcome to ChatCord');
})

const PORT = process.env.PORT || 3000;


server.listen(PORT,() => {
    console.log('listening on port'+ PORT);
    console.log('http://localhost:'+PORT);
})