import React from 'react';
import { Segment, Statistic, Grid, Icon, Header } from 'semantic-ui-react';

import { calcActualStat } from 'services/monsters';

const Stats = ({ monster }) => {
  return (
    <Segment>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{calcActualStat(monster.raw_hp, 6, 40) * 15}</Statistic.Value>
            <Statistic.Label>HP</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{calcActualStat(monster.raw_attack, 6, 40) * 15}</Statistic.Value>
            <Statistic.Label>ATK</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{calcActualStat(monster.raw_defense, 6, 40) * 15}</Statistic.Value>
            <Statistic.Label>DEF</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{monster.speed}</Statistic.Value>
            <Statistic.Label>SPD</Statistic.Label>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{monster.crit_rate}%</Statistic.Value>
            <Statistic.Label>CRI Rate</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{monster.crit_damage}%</Statistic.Value>
            <Statistic.Label>CRI Dmg</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{monster.resistance}%</Statistic.Value>
            <Statistic.Label>Resistance</Statistic.Label>
          </Grid.Column>

          <Grid.Column as={Statistic} size="tiny">
            <Statistic.Value>{monster.accuracy}%</Statistic.Value>
            <Statistic.Label>Accuracy</Statistic.Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Stats;
