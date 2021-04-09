const io = require('socket.io-client')
const assert = require('chai').assert;
const users = require('../users');

let DATA = [
    {user: "dave", text: "afdsag", room: "room1"},
    {user: "dave", text: "adg28", room: "room1"},
    {user: "john", text: "79t31rt3l", room: "room1"},
    {user: "john", text: "03rybfas", room: "room1"}
]

describe('Users', () => {

    
    it('should correctly add user', () => {
        const addUser = users.addUser({ id: 124, name:'Jon', room:'room1' });
        
        assert.equal(
            JSON.stringify(addUser),
            JSON.stringify({ user: { id: 124, name: 'jon', room: 'room1' } })
        );
    });

    it('should correctly get size of chat data Map1', () => {
        const getChatData_empty = users.getChatRoom();
        
        assert.equal(getChatData_empty, 0);
    });
    
    it('should correctly get size of chat data Map', () => {
        const getChatData = users.getChatRoom(DATA);
       
        assert.equal(getChatData, 1);
    });

    it('should correctly display contents of chat data Map', () => {
        const displayChatRoom = users.displayChatRoom('room1');
       
        assert.equal(displayChatRoom, DATA);
    });

    it('should correctly get existing user', () => {
        const getUser = users.getUser(124);
       
        assert.equal(
            JSON.stringify(getUser),
            JSON.stringify({"id":124,"name":"jon","room":"room1"})
        );
    });

    it('should correctly remove existing user', () => {
        const removeUser = users.removeUser(124);
       
        assert.equal(
            JSON.stringify(removeUser),
            JSON.stringify({"id":124,"name":"jon","room":"room1"})
        );
    });

    it('should correctly return -1 for non existing user', () => {
        const getUser = users.getUser(124);
       
        assert.equal(getUser, -1);
    });

    it('should correctly return names of all users from a specific room', () => {
        const addUser1 = users.addUser({ id: 125, name:'Dave', room:'room1' });
        const addUser2 = users.addUser({ id: 126, name:'Bane', room:'room1' });
        const addUser3 = users.addUser({ id: 127, name:'Bruce', room:'room1' });
        const getUsersInRoom = users.getUsersInRoom('room1');
       
        assert.equal(
            JSON.stringify(getUsersInRoom),
            JSON.stringify([
                {"id":125,"name":"dave","room":"room1"},
                {"id":126,"name":"bane","room":"room1"},
                {"id":127,"name":"bruce","room":"room1"}
            ])
        );
    });

})








// describe('Suite of unit tests', () => {

//     let socket;

//     beforeEach(function(done) {
//         // Setup
//         socket = io.connect('http://localhost:3000', {
//             'reconnection delay' : 0
//             , 'reopen delay' : 0
//             , 'force new connection' : true
//         });
//         socket.on('connect', function() {
//             console.log('worked...');
//             done();
//         });
//         socket.on('disconnect', function() {
//             console.log('disconnected...');
//         })
//     });

//     afterEach(function(done) {
//         // Cleanup
//         if(socket.connected) {
//             console.log('disconnecting...');
//             socket.disconnect();
//         } else {
//             // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
//             console.log('no connection to break...');
//         }
//         done();
//     });

//     describe('First (hopefully useful) test', () => {

//         it('Doing some things with indexOf()', function(done) {
//             expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
//             expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
//             done();
//         });

//         it('Doing something else with indexOf()', function(done) {
//             expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
//             expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
//             done();
//         });

//     });

// });