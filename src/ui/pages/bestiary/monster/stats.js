import React from 'react';
import { Segment, Statistic, Icon, Header, Dropdown } from 'semantic-ui-react';

import { calcActualStat, maxLevel } from 'services/monsters';

const StarSelector = ({ min_stars, onChange }) => {
  const options = [];

  for (let stars = 6; stars >= min_stars; stars--) {
    options.push({
      key: stars,
      value: stars,
      text: (
        <span>
          {stars}
          <Icon name="star" />
        </span>
      )
    });
  }

  return <Dropdown inline defaultValue={options[0].value} options={options} onChange={onChange} />;
};

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stars: 6, level: maxLevel(6) };
  }

  onChangeStars = (event, data) => {
    this.setState({
      stars: data.value,
      level: maxLevel(data.value)
    });
  };

  render() {
    const { monster } = this.props;

    return (
      <Segment>
        <Header size="small">
          <Header.Content>
            Stats at{' '}
            <StarSelector
              min_stars={
                monster.is_awakened && monster.archetype !== 'Material'
                  ? monster.base_stars - 1
                  : monster.base_stars
              }
              onChange={this.onChangeStars}
            />{' '}
            lv. {maxLevel(this.state.stars)}
          </Header.Content>
        </Header>
        <Statistic.Group size="tiny" widths="four">
          <Statistic>
            <Statistic.Value>
              {calcActualStat(monster.raw_hp, this.state.stars, this.state.level) * 15}
            </Statistic.Value>
            <Statistic.Label>HP</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {calcActualStat(monster.raw_attack, this.state.stars, this.state.level)}
            </Statistic.Value>
            <Statistic.Label>ATK</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {calcActualStat(monster.raw_defense, this.state.stars, this.state.level)}
            </Statistic.Value>
            <Statistic.Label>DEF</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{monster.speed}</Statistic.Value>
            <Statistic.Label>SPD</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{monster.crit_rate}%</Statistic.Value>
            <Statistic.Label>CRI Rate</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{monster.crit_damage}%</Statistic.Value>
            <Statistic.Label>CRI Dmg</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{monster.resistance}%</Statistic.Value>
            <Statistic.Label>Resistance</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{monster.accuracy}%</Statistic.Value>
            <Statistic.Label>Accuracy</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    );
  }
}

export default Stats;
