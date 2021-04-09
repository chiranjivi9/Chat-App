import Chat from '../Chat/Chat';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders Chatw component', () => {
  let location = {
    search: 'someLink'
  }
    const component = renderer.create(
      <Chat location={location} />
    );

    let chatComponent = component.toJSON()

    expect(chatComponent).toMatchSnapshot();
});
