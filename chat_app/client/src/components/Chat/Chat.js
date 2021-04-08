import './Chat.css';

import React, { useEffect, useState } from 'react';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import io from "socket.io-client";
import queryString from 'query-string';

let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageStore, setMessageStore] = useState([]);
    const ENDPOINT = 'localhost:5000';
    
    // similar to componentDidMount (runs when component will render)
    useEffect(() => {
        const { name, room } = queryString.parse(location.search); // returns url parameters

        socket = io(ENDPOINT);
            
        setName(name);
        setRoom(room);

        console.log('LOCATION!!!!', location);
        socket.emit('join', { name, room }, () => {
            //TODO: Error handling...
        });


        // used for unmounting...
        return () => {
            socket.emit('disconnect');

            socket.off(); // should close one chat instance
        }
    }, [ENDPOINT, location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
            setMessageStore([...messageStore, message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages, messageStore]);

    // Send Message
    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    useEffect(() => {
        socket.emit('getAllMessages', (messageStore), () => {
            //TODO: err handling
        });
    })
    console.log('1--', message, messages);
    console.log('2--',message, messageStore);

    return (
        <div className="outerContainer">   
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;