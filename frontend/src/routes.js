import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewItem from './pages/NewItem';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" exact component={NewItem} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;