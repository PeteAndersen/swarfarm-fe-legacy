import React from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';
import Pager from 'ui/components/Pager';

class Bestiary extends React.Component {
  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);

    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }

    this.props.changePage(1);
  }

  handlePageChange = (e, { page }) => {
    this.props.changePage(page);
  };

  render() {
    const { isPopulating, wasPopulated, currentPage, numPages, monsterList } = this.props;

    const pager = (
      <Pager
        secondary
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={this.handlePageChange}
      />
    );

    const bestiaryList = (
      <Grid>
        <Grid.Column width={4}>
          <FilterForm />
        </Grid.Column>
        <Grid.Column width={12} stretched>
          {pager}
          <MonsterList monsters={monsterList} />
          {pager}
        </Grid.Column>
      </Grid>
    );

    return (
      <div>
        <Loader active={isPopulating && !wasPopulated}>Populating bestiary...</Loader>
        {isPopulating && !wasPopulated ? null : bestiaryList}
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
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary()),
  changePage: page => dispatch(bestiaryActions.changePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
