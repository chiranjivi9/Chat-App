import InfoBar from '../InfoBar/InfoBar';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders InfoBar component', () => {

    const component = renderer.create(
      <InfoBar />
    );

    let infoBarComponent = component.toJSON()

    expect(infoBarComponent).toMatchSnapshot();
});
