import React, { Component } from 'react';
import { WindowScroller, AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Icon } from 'semantic-ui-react';

import history from 'state/history';
import { getSlug } from 'services/monsters';
import { Portrait, Element } from 'ui/components/monsters';
import { SkillImage, LeaderSkillImage } from 'ui/components/skills';

class MonsterList extends Component {
  onRowClick = ({ rowData: monster }) => {
    history.push(`/bestiary/${monster.id}-${getSlug(monster)}`);
  };

  _renderPortrait = ({ rowData }) => {
    return <Portrait monster={rowData} />;
  };

  _renderElement = ({ rowData }) => {
    return <Element monster={rowData} avatar />;
  };

  _renderStars = ({ cellData }) => {
    return (
      <span>
        {cellData}
        <Icon name="star" />
      </span>
    );
  };

  _renderLeaderSkill = ({ rowData }) => {
    return rowData.leader_skill ? (
      <LeaderSkillImage skill={rowData.leader_skill} size="mini" tooltip />
    ) : null;
  };

  _renderSkills = ({ rowData: { skills } }) => {
    return (
      <span>
        {skills.map((skill, index) => (
          <SkillImage tooltip size="mini" inline skill={skill} key={index} />
        ))}
      </span>
    );
  };

  _renderPercentage = ({ cellData }) => `${cellData}%`;

  render() {
    const { monsters } = this.props;

    return (
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                autoHeight
                headerHeight={30}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                overscanRowCount={2}
                rowCount={monsters.length}
                rowHeight={80}
                rowGetter={({ index }) => monsters[index]}
                scrollTop={scrollTop}
                width={width}
                sortBy="name"
                sortDirection={SortDirection.ASC}
                onRowClick={this.onRowClick}
              >
                <Column
                  label=""
                  dataKey="portrait"
                  width={80}
                  cellRenderer={this._renderPortrait}
                />
                <Column label="Name" dataKey="name" width={1} flexGrow={1} />
                <Column
                  label="Stars"
                  dataKey="base_stars"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderStars}
                />
                <Column
                  label="Element"
                  dataKey="element"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderElement}
                />
                <Column label="Archetype" dataKey="archetype" width={1} flexGrow={1} />
                <Column
                  label="Leader Skill"
                  dataKey="leaderSkill"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderLeaderSkill}
                />
                <Column
                  label="Skills"
                  dataKey="skills"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderSkills}
                />
                <Column label="HP (Lv. MAX)" dataKey="max_lvl_hp" width={1} flexGrow={1} />
                <Column label="ATK (Lv. MAX)" dataKey="max_lvl_attack" width={1} flexGrow={1} />
                <Column label="DEF (Lv. MAX)" dataKey="max_lvl_defense" width={1} flexGrow={1} />
                <Column label="SPD" dataKey="speed" width={1} flexGrow={1} />
                <Column
                  label="CRI Rate"
                  dataKey="crit_rate"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderPercentage}
                />
                <Column
                  label="CRI Damage"
                  dataKey="crit_damage"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderPercentage}
                />
                <Column
                  label="Accuracy"
                  dataKey="accuracy"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderPercentage}
                />
                <Column
                  label="Resistance"
                  dataKey="resistance"
                  width={1}
                  flexGrow={1}
                  cellRenderer={this._renderPercentage}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }
}

export default MonsterList;
