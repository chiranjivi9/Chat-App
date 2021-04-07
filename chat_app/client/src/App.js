import { Route, BrowserRouter as Router } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import React from 'react';

const App = () => (
  <Router>
    <Route path = "/" exact component = {Join}/>
    <Route path = "/thread" component = {Chat} />

  </Router>
)

export default App;
