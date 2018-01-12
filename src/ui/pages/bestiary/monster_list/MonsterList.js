import React from 'react';
import { Grid } from 'semantic-ui-react';

import MonsterCard from './MonsterCard';

const MonsterList = ({ monsters }) => (
  <Grid>
    {monsters.map(monster => {
      return <MonsterCard key={monster.id} monster={monster} />;
    })}
  </Grid>
);

export default MonsterList;
