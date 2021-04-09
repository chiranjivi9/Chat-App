import Message from '../Messages/Message/Message';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders Message component', () => {
    let mock = {
        message: {
            text: 'Some text',
            user: 'Samurai'
        }
    }
    const component = renderer.create(
      <Message message={mock} name={mock.message.user} />
    );

    let messageComponent = component.toJSON()

    expect(messageComponent).toMatchSnapshot();
});
