import Messages from '../Messages/Messages';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders Messages component', () => {
    let mockMessages = [
        {user: "dave", text: "afdsag", room: "room1"},
        {user: "dave", text: "adg28", room: "room1"},
        {user: "john", text: "79t31rt3l", room: "room1"},
        {user: "john", text: "03rybfas", room: "room1"}
    ]
    const component = renderer.create(
      <Messages messages={mockMessages} name={mockMessages[1].user} />
    );

    let messagesComponent = component.toJSON()

    expect(messagesComponent).toMatchSnapshot();
});
