import React, { Component } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
  AutoSizer,
  List
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import history from 'state/history';
import { getSlug } from 'services/monsters';
import { Portrait, Element } from 'ui/components/monsters';
import { SkillImage, LeaderSkillImage } from 'ui/components/skills';

class MonsterList extends Component {
  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50
  });

  rowRenderer = ({ index, style, key, parent, ...props }) => {
    const cards = [];
    console.log(this._cache.rowHeight(index));

    for (let i = 0; i < 3; i++) {
      const monster = this.props.monsters[index * 3 + i];

      if (monster) {
        cards.push(
          <Card key={index + i} as={Link} to={`/bestiary/${monster.id}-${getSlug(monster)}`}>
            <Card.Content>
              <Portrait monster={monster} size="tiny" />
              <Card.Header>{monster.name}</Card.Header>
            </Card.Content>
          </Card>
        );
      }
    }

    return (
      <CellMeasurer cache={this._cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        <div style={{ ...style, padding: '1em' }}>
          <Card.Group itemsPerRow={3}>{cards}</Card.Group>
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const { monsters } = this.props;
    const columnCount = 3;

    return (
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                deferredMeasurementCache={this._cache}
                autoHeight
                height={height}
                rowHeight={this._cache.rowHeight}
                rowRenderer={this.rowRenderer}
                rowCount={Math.ceil(monsters.length / columnCount)}
                overscanRowCount={2}
                columnWidth={width / columnCount}
                columnCount={columnCount}
                width={width}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }
}

export default MonsterList;
