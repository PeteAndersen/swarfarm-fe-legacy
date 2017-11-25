import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import Pager from 'ui/components/Pager';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';

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
        pagination
        floated="right"
        currentPage={currentPage}
        numPages={numPages}
        onPageChange={this.handlePageChange}
      />
    );

    return (
      <Dimmer.Dimmable as={Segment} dimmed={isPopulating && !wasPopulated}>
        <Dimmer active={isPopulating && !wasPopulated} page>
          <Loader>
            <Header size="large" color="green">
              Populating Bestiary...
            </Header>
            <p>This is a one-time process</p>
          </Loader>
        </Dimmer>
        <Grid>
          <Grid.Column width={4}>
            <FilterForm />
          </Grid.Column>
          <Grid.Column width={12}>
            {pager}
            <MonsterList monsters={monsterList} />
            {pager}
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
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
