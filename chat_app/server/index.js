const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser,
        removeUser,
        getUser,
        getUsersInRoom,
        getChatRoom
    } = require('./users.js');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);

corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
   }
const io = socketio(server, corsOptions);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        // letting the user know they joined the chat room
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room-${user.room}`,  room: user.room });

        // letting others know who joined the chat room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        console.log('SEND MESSAGE: getUser', user);
       
        if(user) {
            io.to(user.room).emit('message', { user: user.name, text: message, room: user.room });
        }

        callback();
      });

    socket.on('getAllMessages', (messages, callback) => {
        getChatRoom(messages)
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left.');
        const user = removeUser(socket.id);

        if(user) {
            // displaying it to other users
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
        }
    });
    
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
