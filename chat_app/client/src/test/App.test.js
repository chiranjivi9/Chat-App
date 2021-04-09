import App from '../App';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders App component', () => {
    const component = renderer.create(
      <App />
    );

    let appComponent = component.toJSON()

    expect(appComponent).toMatchSnapshot();
});
