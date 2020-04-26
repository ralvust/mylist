import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import NewItem from './pages/NewItem';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/list/:listId" exact component={List} />
        <Route path="/list/:listId/new-item" exact component={NewItem} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;