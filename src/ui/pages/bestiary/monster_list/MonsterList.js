import React from 'react';
import { Item } from 'semantic-ui-react';

import MonsterItem from './MonsterItem';

const MonsterList = ({ monsters }) => (
  <Item.Group link divided>
    {monsters.map(monster => {
      return <MonsterItem key={monster.id} monster={monster} />;
    })}
  </Item.Group>
);

export default MonsterList;
