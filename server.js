const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage= require('./utils/messages');
const { userJoin, getCurrentUser }= require('./utils/users');

const app = express();
const server = http.createServer(app);
const io =socketio(server);
const dotenv = require('dotenv');
dotenv.config();


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord bot';

//run when a clint connect
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user= userJoin(socket.id, username, room)
        
        socket.join(user.room)

    //welcome currenrt user
    socket.emit('message', formatMessage(botName,'welcome to ChatCord'));

    //Broadcast when a user connect
    socket.broadcast
    .to(user.room)
    .emit(
        'message', 
        formatMessage(botName, `${user.username} has joined the chat`));

    })

       
    //listen for chat messages
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username, msg));
    })

    // Runs when the clint disconnect
    socket.on('disconnect', () =>{
        io.emit('message', formatMessage(botName, `${user.username} has left the chat`));
    })

})

const PORT = process.env.PORT || 3000;

server.listen(PORT,() => {
    console.log('listening on port '+ PORT);
    console.log('http://localhost:'+PORT);
})
