const users = [];
let allMessages = new Map();
const addUser = ({ id, name, room }) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => 
        user.room === room && user.name === name
    );
    
    if(existingUser) return { error: 'Username is taken'};

    const user = { id, name, room};
    users.push(user);

    return { user };
}

const getChatRoom = (chatData) => {
    let room = chatData[0] ? chatData[0].room : '';
    console.log('CHAT Data', chatData);
    if(room !== '') {
        allMessages.set( room, chatData);
    }
}

const displayChatRoom = (room) => {
    console.log('inside displayChatRoom', room, ' ->',  allMessages);
    if(allMessages.has(room)) {
        console.log(allMessages.get(room));
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id );

    if (index !== -1) return users.splice(index, 1)[0];
}


const getUser = (id) => users.find((user) =>  user.id === id); 


const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = { addUser, removeUser, getChatRoom, displayChatRoom, getUser, getUsersInRoom };