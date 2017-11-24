import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Monsters from './monsters';
import Dungeons from './dungeons';

const Routes = () => (
  <Switch>
    <Route path="/bestiary" component={Monsters} exact />
    <Route path="/bestiary/dungeons" component={Dungeons} />
  </Switch>
);

export default Routes;
