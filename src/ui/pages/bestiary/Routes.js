import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MonsterList from './monster_list';
import Monster from './monster';
import Dungeons from './dungeons';

const Routes = () => (
  <Switch>
    <Route path="/bestiary/dungeons" component={Dungeons} />
    <Route path="/bestiary/:page(\d+)?" component={MonsterList} exact />
    <Route path="/bestiary/:id(\d+)-:name" component={Monster} exact />
  </Switch>
);

export default Routes;
