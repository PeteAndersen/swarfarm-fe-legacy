import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Menu,
  Dropdown,
  Dimmer,
  Loader,
  Header,
  Pagination,
  Icon
} from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import history from 'state/history';
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

    // Update state if page is from URL.
    // Update URL if page is from state.
    const urlPage = Number(this.props.match.params.page);
    if (urlPage) {
      this.props.changePage(urlPage);
    } else {
      this.props.changePage(1);
    }
  }

  handlePageChange = (e, { activePage }) => {
    history.push(`/bestiary/${activePage}`);
    this.props.changePage(activePage);
  };

  render() {
    const { isPopulating, wasPopulated, monsterList, pageSize, page } = this.props;
    const monsterPageSlice = monsterList.slice((page - 1) * pageSize, page * pageSize);
    const numPages = Math.ceil(monsterList.length / pageSize);
    const pager = (
      <Pagination
        floated="right"
        pointing
        secondary
        activePage={page}
        onPageChange={this.handlePageChange}
        totalPages={numPages}
        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
      />
    );

    return (
      <Dimmer.Dimmable as={Segment} dimmed={isPopulating && !wasPopulated}>
        <ScrollToTopOnMount />

        <Grid>
          <Grid.Column width={4}>
            <FilterForm />
          </Grid.Column>
          <Grid.Column width={12}>
            <Menu secondary>
              <Dropdown item text="Sort By">
                <Dropdown.Menu>
                  <Dropdown.Item>Small</Dropdown.Item>
                  <Dropdown.Item>Medium</Dropdown.Item>
                  <Dropdown.Item>Large</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {pager}
            </Menu>
            <Dimmer active={isPopulating && !wasPopulated} inverted>
              <Loader>
                <Header size="large" color="green">
                  Populating Bestiary...
                </Header>
                <p>This is a one-time process</p>
              </Loader>
            </Dimmer>
            {wasPopulated ? <MonsterList monsters={monsterPageSlice} /> : null}
            <Menu secondary>{pager}</Menu>
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
  monsterList: bestiarySelectors.getFilteredMonsterList(state),
  page: bestiarySelectors.bestiaryPage(state),
  pageSize: bestiarySelectors.bestiaryPageSize(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary()),
  changePage: page => dispatch(bestiaryActions.setBestiaryPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
