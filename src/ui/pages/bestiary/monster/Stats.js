import React from 'react';
import { Card } from 'semantic-ui-react';

import { calcActualStat } from 'services/monsters';

const Stats = ({ monster }) => {
  return <Card>6-star HP: {calcActualStat(monster.raw_hp, 5, 35) * 15}</Card>;
};

export default Stats;
