import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Dimmer, Loader, Header } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import { ScrollToTopOnMount } from 'ui/components';
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
    const { isPopulating, wasPopulated, monsterList } = this.props;
    return (
      <Dimmer.Dimmable as={Segment} dimmed={isPopulating && !wasPopulated}>
        <ScrollToTopOnMount />

        <Grid>
          <Grid.Column width={4}>
            <FilterForm handleSubmit={this.props.applyFilters} />
          </Grid.Column>
          <Grid.Column width={12}>
            <Dimmer active={isPopulating && !wasPopulated} inverted>
              <Loader>
                <Header size="large" color="green">
                  Populating Bestiary...
                </Header>
                <p>This is a one-time process</p>
              </Loader>
            </Dimmer>
            {wasPopulated ? <MonsterList monsters={monsterList} /> : null}
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: bestiarySelectors.isLoading(state),
  lastPopulated: bestiarySelectors.lastPopulated(state),
  isPopulating: bestiarySelectors.isPopulating(state),
  wasPopulated: bestiarySelectors.wasPopulated(state),
  monsterList: bestiarySelectors.getFilteredMonsterList(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary()),
  applyFilters: values => dispatch(bestiaryActions.setBestiaryFilters(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
