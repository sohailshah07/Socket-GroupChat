const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');



//get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

//join chat Room 
socket.emit('joinRoom', {username, room});

//get room and Users
socket.on('roomUsers',({room , users}) => {
    outputRoomName(room);
    outputUsers(room);

})

//Message from server
socket.on('message',message => {
    console.log(message);
    outputMessage(message);

    //scroll down automatically
    chatMessages.scrollTop =chatMessages.scrollHeight;
})

//message submit
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get message text
    let msg = e.target.elements.msg.value;

    //emit message to server
    socket.emit('chatMessage', msg);

    //clear chat input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
	<p class="text">
		${message.text}
	</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add room name to DOM 
function outputRoomName(room) {
    roomName.innerText = room;
}

//add user to DOM
function outputUsers(user){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}