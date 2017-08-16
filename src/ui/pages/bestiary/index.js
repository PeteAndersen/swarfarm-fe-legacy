import React from 'react';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';

class Bestiary extends React.Component {
  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);

    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }
  }

  render() {
    const { isPopulating, wasPopulated, isLoading, monsterList } = this.props;
    const bestiaryList = (
      <Grid>
        <Grid.Column width={4}>
          <FilterForm />
        </Grid.Column>
        <Grid.Column width={12} stretched>
          <MonsterList monsters={monsterList} />
        </Grid.Column>
      </Grid>
    );

    return (
      <div>
        <Loader active={isPopulating && !wasPopulated}>Populating bestiary...</Loader>
        {isPopulating ? null : bestiaryList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: bestiarySelectors.isLoading(state),
  isPopulating: bestiarySelectors.isPopulating(state),
  wasPopulated: bestiarySelectors.wasPopulated(state),
  lastPopulated: bestiarySelectors.lastPopulated(state),
  currentPage: bestiarySelectors.getCurrentPage(state),
  pageSize: bestiarySelectors.getPageSize(state),
  monsterList: bestiarySelectors.getMonsterList(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
