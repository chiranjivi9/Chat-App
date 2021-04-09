import Join from '../Join/Join';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

test('renders Join component', () => {
    let link = {}
    const component = renderer.create(
        <Router>
            <Join />
        </Router>
    );

    let joinComponent = component.toJSON()

    expect(joinComponent).toMatchSnapshot();
});
