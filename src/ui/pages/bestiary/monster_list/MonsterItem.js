import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Statistic } from 'semantic-ui-react';

import Portrait from 'ui/components/monsters/Portrait';

import { getSlug, calcActualStat } from 'services/monsters';

const MonsterItem = ({ monster }) => {
  return (
    <Item as={Link} to={`/bestiary/${monster.id}-${getSlug(monster)}`}>
      <Portrait monster={monster} size="tiny" />

      <Item.Content>
        <Item.Header>{monster.name}</Item.Header>
        <Item.Description>
          <Statistic.Group size="mini">
            <Statistic style={{ margin: '0 0 1.5em 2em' }}>
              <Statistic.Label>HP</Statistic.Label>
              <Statistic.Value text>{calcActualStat(monster.raw_hp, 6, 40) * 15}</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>ATK</Statistic.Label>
              <Statistic.Value text>{calcActualStat(monster.raw_attack, 6, 40)}</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>DEF</Statistic.Label>
              <Statistic.Value text>{calcActualStat(monster.raw_defense, 6, 40)}</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>SPD</Statistic.Label>
              <Statistic.Value text>{monster.speed}</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>CRI Rate</Statistic.Label>
              <Statistic.Value text>{monster.crit_rate}%</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>CRI Dmg</Statistic.Label>
              <Statistic.Value text>{monster.crit_damage}%</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>Resistance</Statistic.Label>
              <Statistic.Value text>{monster.resistance}%</Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>Accuracy</Statistic.Label>
              <Statistic.Value text>{monster.accuracy}%</Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default MonsterItem;
