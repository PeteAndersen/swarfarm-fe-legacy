import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import history from 'state/history';
import { Pager, ScrollToTopOnMount } from 'ui/components';
import FilterForm from './FilterForm';
import MonsterList from './MonsterList';

class Bestiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, pageSize: 50 };
  }

  handlePageChange = (e, { page }) => {
    history.push(`/bestiary/${page}`);
  };

  render() {
    const { isPopulating, wasPopulated, monsterList } = this.props;
    const page = Number(this.props.match.params.page) || 1;
    const monsterPageSlice = monsterList.slice(
      (page - 1) * this.state.pageSize,
      page * this.state.pageSize
    );
    const numPages = Math.ceil(monsterList.length / this.state.pageSize);
    const pager = (
      <Pager
        pagination
        floated="right"
        currentPage={page}
        numPages={numPages}
        onPageChange={this.handlePageChange}
      />
    );

    return (
      <Dimmer.Dimmable as={Segment} dimmed={isPopulating && !wasPopulated}>
        <ScrollToTopOnMount />
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
            <MonsterList monsters={monsterPageSlice} />
            {pager}
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: bestiarySelectors.isLoading(state),
  isPopulating: bestiarySelectors.isPopulating(state),
  wasPopulated: bestiarySelectors.wasPopulated(state),
  monsterList: bestiarySelectors.getVisibleMonsterList(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
