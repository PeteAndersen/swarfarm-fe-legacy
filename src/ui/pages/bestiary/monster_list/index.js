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

  handleFilterSubmit = payload => {
    // Transform form values into filter values
    const filterValues = transformValuesToFilters({
      name__contains: { value: payload.name },
      element__valueIn: { value: payload.element },
      is_awakened: { value: payload.is_awakened },
      base_stars__gte: { value: payload.min_stars },
      base_stars__lte: { value: payload.max_stars },
      archetype__valueIn: { value: payload.archetype },
      leader_skill__area__valueIn: { value: payload.leader_skill_area },
      leader_skill__attribute__valueIn: { value: payload.leader_skill_attribute },
      leader_skill__amount__gte: {
        value:
          payload.leader_skill_area.length > 0 || payload.leader_skill_attribute > 0
            ? payload.leader_skill_min_amount
            : undefined
      },
      skills__effects__effect__id__valueIn: {
        value: payload.buffs.concat(payload.debuffs, payload.others),
        operator: 'all',
        swap: true
      },
      skills__scales_with__valueIn: { value: payload.scales_with, operator: 'all', swap: true },
      skills__hits__gte: { value: payload.hits[0] },
      skills__hits__lte: { value: payload.hits[1] }
    });

    this.props.applyFilters(filterValues);
  };

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
            <FilterForm handleSubmit={this.handleFilterSubmit} />
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
  applyFilters: values => dispatch(bestiaryActions.setBestiaryFilters(values)),
  setSortKey: (e, data) => dispatch(bestiaryActions.setBestiarySortKey(data.value)),
  setSortDir: (e, data) => {
    dispatch(bestiaryActions.setBestiarySortDir(data.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
