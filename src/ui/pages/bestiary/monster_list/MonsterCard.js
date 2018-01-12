import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Image, List } from 'semantic-ui-react';
import styled from 'styled-components';

import Portrait from 'ui/components/monsters/Portrait';

import { getSlug, calcActualStat } from 'services/monsters';

const elementColorMap = {
  Fire: 'red',
  Water: 'blue',
  Wind: 'yellow',
  Light: 'grey',
  Dark: 'purple'
};

const CondensedColumn = styled(Grid.Column)`
  padding: 2px !important;
`;

const MonsterCard = ({ monster }) => {
  const monster_stats = [
    { stat: 'HP', value: calcActualStat(monster.raw_hp, 6, 40) * 15 },
    { stat: 'CRI Rate', value: monster.crit_rate, pct: true },
    { stat: 'ATK', value: calcActualStat(monster.raw_attack, 6, 40) },
    { stat: 'CRI Dmg', value: monster.crit_damage, pct: true },
    { stat: 'DEF', value: calcActualStat(monster.raw_defense, 6, 40) },
    { stat: 'ACC', value: monster.accuracy, pct: true },
    { stat: 'SPD', value: monster.speed },
    { stat: 'RES', value: monster.resistance, pct: true }
  ];
  return (
    <Grid.Column widescreen={3} computer={4} tablet={6} mobile={12}>
      <Card
        fluid
        as={Link}
        to={`/bestiary/${monster.id}-${getSlug(monster)}`}
        color={elementColorMap[monster.element]}
      >
        <Card.Content>
          <Portrait monster={monster} size="tiny" />
          <Card.Header>{monster.name}</Card.Header>
          <Card.Meta>
            <Image
              avatar
              spaced="right"
              src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element.toLowerCase()}.png`}
            />{' '}
            {monster.archetype}
          </Card.Meta>
          <Card.Description>
            <Grid columns={4}>
              {monster_stats.map(stat => [
                <CondensedColumn textAlign="right" key={1}>
                  <strong>{stat.stat}</strong>
                </CondensedColumn>,
                <CondensedColumn textAlign="left" key={2}>
                  {stat.value}
                  {stat.pct ? '%' : null}
                </CondensedColumn>
              ])}
            </Grid>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <List>
            {monster.skills
              ? monster.skills.map(skill => (
                  <List.Item>
                    <Image
                      size="mini"
                      rounded
                      verticalAlign="middle"
                      src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
                    />{' '}
                    <span>{skill.name}</span>
                  </List.Item>
                ))
              : null}
          </List>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default MonsterCard;
