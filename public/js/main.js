const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-message');

const socket = io();


//Message from server
socket.on('message',message => {
    console.log(message);
    outputMessage(message);

    //scroll down automatically
    chatMessage.scrollTop =chatMessage.scrollHeight;
})

//message submit
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;

    //emit messageto server

    socket.emit('chatMessage', msg);
})