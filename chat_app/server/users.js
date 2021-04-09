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
    let room = chatData && chatData[0] ? chatData[0].room : '';
    
    if(room !== '') {
        allMessages.set( room, chatData);
        console.log('CHAT DATA: ', chatData);
    }

    if(allMessages.size) {
        return allMessages.size;
    } 
    return 0;
}

const displayChatRoom = (room) => {
    console.log('DISPLAY CHAT ROOM CONTENTS: ', allMessages);
    if(allMessages.has(room)) {
        return allMessages.get(room);
    }

    return null;
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id );

    if (index !== -1) return users.splice(index, 1)[0];
}


const getUser = (id) => {
   let getUser = users.find((user) =>  user.id === id);

   if(getUser) {
       return getUser
   };
   
   return -1;
} 

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = { addUser, removeUser, getChatRoom, displayChatRoom, getUser, getUsersInRoom };