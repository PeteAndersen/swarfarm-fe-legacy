import React, { Component } from 'react';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Card, Header, Icon } from 'semantic-ui-react';

import MonsterCard from './MonsterCard';

class MonsterList extends Component {
  minCardWidth = 420;

  render() {
    const { monsters } = this.props;

    return (
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              const itemsPerRow = Math.max(1, Math.floor(width / this.minCardWidth));

              return (
                <List
                  autoHeight
                  height={height}
                  rowHeight={300}
                  rowCount={Math.ceil(monsters.length / itemsPerRow)}
                  overscanRowCount={3}
                  columnWidth={width / itemsPerRow}
                  columnCount={itemsPerRow}
                  width={width}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowRenderer={({ index, style, key, parent }) => {
                    const rowMonsters = [];
                    for (let i = 0; i < itemsPerRow; i++) {
                      const monster = this.props.monsters[index * itemsPerRow + i];

                      if (monster) {
                        rowMonsters.push(monster);
                      }
                    }

                    return (
                      <div
                        key={key}
                        style={{
                          ...style,
                          paddingLeft: '1em',
                          paddingRight: '1em',
                          marginTop: '5px'
                        }}
                      >
                        <Card.Group itemsPerRow={itemsPerRow}>
                          {rowMonsters.map((monster, idx) => (
                            <MonsterCard key={idx} monster={monster} />
                          ))}
                        </Card.Group>
                      </div>
                    );
                  }}
                  noRowsRenderer={() => (
                    <Header icon textAlign="center">
                      <Icon name="filter" />No Matches
                      <Header.Subheader>Your perfect monster doesn't exist</Header.Subheader>
                    </Header>
                  )}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }
}

export default MonsterList;
