import Input from '../Input/Input';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders Input component', () => {

    const component = renderer.create(
      <Input />
    );

    let inputComponent = component.toJSON()

    expect(inputComponent).toMatchSnapshot();
});
