import React from 'react';
import Routes from './routes';

import Store from './store/Store'

import './global.css';

function App() {
  return (
    <Store>
      <Routes />
    </Store>
  );
}

export default App;
