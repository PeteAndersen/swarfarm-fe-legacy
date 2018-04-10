import React, { Component } from 'react';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Card } from 'semantic-ui-react';

import MonsterCard from './MonsterCard';

class MonsterList extends Component {
  minCardWidth = 450;

  render() {
    const { monsters } = this.props;

    return (
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              const itemsPerRow = Math.floor(width / this.minCardWidth);

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
                    for (let i = 0; i < 3; i++) {
                      const monster = this.props.monsters[index * 3 + i];

                      if (monster) {
                        rowMonsters.push(monster);
                      }
                    }

                    return (
                      <div style={{ ...style, padding: '1em' }}>
                        <Card.Group itemsPerRow={itemsPerRow}>
                          {rowMonsters.map((monster, idx) => (
                            <MonsterCard key={idx} monster={monster} />
                          ))}
                        </Card.Group>
                      </div>
                    );
                  }}
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
