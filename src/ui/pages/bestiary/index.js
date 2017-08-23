import React from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';
import Pager from './Pager';

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
      isLoading,
      currentPage,
      numPages,
      monsterList
    } = this.props;
    const bestiaryList = (
      <Grid>
        <Grid.Column width={4}>
          <FilterForm />
        </Grid.Column>
        <Grid.Column width={12} stretched>
          <Pager currentPage={currentPage} numPages={numPages} />
          <div>
            Pages: {numPages}
          </div>
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
  numPages: bestiarySelectors.getPageCount(state),
  monsterList: bestiarySelectors.getVisibleMonsterList(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
