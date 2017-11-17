import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Register, Login, News, Bestiary } from 'ui/pages';
import NotFound from 'ui/components/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} exact />
    <Route path="/news" component={News} />
    <Route path="/bestiary" component={Bestiary} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
