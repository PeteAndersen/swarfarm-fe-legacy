import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu, Dimmer, Loader, Header, Dropdown } from 'semantic-ui-react';
import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import { transformValuesToFilters } from 'services/filters';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';

const FilterMenu = styled(Menu)`
  height: calc(100% - 42px) !important;
  top: 42px !important;
  overflow-x: hidden;
`;

const MonsterListContainer = styled.div`
  margin-left: 280px;
`;

const sortByOptions = [
  { text: 'Name', value: 'name' },
  { text: 'Stars', value: 'base_stars' },
  { text: 'Element', value: 'element' }
];

const sortDirectionOptions = [{ text: 'Ascending', value: 1 }, { text: 'Descending', value: -1 }];
class Bestiary extends React.Component {
  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);

    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }
  }

  render() {
    const {
      isPopulating,
      wasPopulated,
      monsterList,
      totalMonsterCount,
      sortKey,
      setSortKey,
      sortDirection,
      setSortDir
    } = this.props;
    return (
      <div>
        <FilterMenu vertical fixed="left" size="huge">
          <Menu.Item>
            <Menu.Header>Filters</Menu.Header>
          </Menu.Item>
          <Menu.Item>
            <FilterForm handleSubmit={this.props.applyFilters} />
          </Menu.Item>
        </FilterMenu>
        <Dimmer.Dimmable as={MonsterListContainer}>
          <Dimmer active={isPopulating && !wasPopulated} inverted>
            <Loader>
              <Header size="large" color="green">
                Populating Bestiary...
              </Header>
              <p>This is a one-time process</p>
            </Loader>
          </Dimmer>

          {wasPopulated ? (
            <div>
              <Menu secondary>
                <Menu.Item>
                  Sort by{' '}
                  <Dropdown inline options={sortByOptions} value={sortKey} onChange={setSortKey} />{' '}
                  <Dropdown
                    inline
                    options={sortDirectionOptions}
                    value={sortDirection}
                    onChange={setSortDir}
                  />
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    Showing {monsterList.length} of {totalMonsterCount} monsters
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              <MonsterList monsters={monsterList} />
            </div>
          ) : null}
        </Dimmer.Dimmable>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: bestiarySelectors.isLoading(state),
  lastPopulated: bestiarySelectors.lastPopulated(state),
  isPopulating: bestiarySelectors.isPopulating(state),
  wasPopulated: bestiarySelectors.wasPopulated(state),
  totalMonsterCount: bestiarySelectors.getDefaultMonsterList(state).length,
  monsterList: bestiarySelectors.getFilteredMonsterList(state),
  sortKey: bestiarySelectors.getSortKey(state),
  sortDirection: bestiarySelectors.getSortDirection(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary()),
  applyFilters: values =>
    dispatch(bestiaryActions.setBestiaryFilters(transformValuesToFilters(values))),
  setSortKey: (e, data) => dispatch(bestiaryActions.setBestiarySortKey(data.value)),
  setSortDir: (e, data) => {
    dispatch(bestiaryActions.setBestiarySortDir(data.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
