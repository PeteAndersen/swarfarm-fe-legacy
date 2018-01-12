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
  constructor(props) {
    super(props);
    this.state = { page: 1, pageSize: 100 };
  }

  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);

    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }
  }

  handlePageChange = (e, { activePage }) => {
    history.push(`/bestiary/${activePage}`);
  };

  render() {
    const { isPopulating, wasPopulated, monsterList } = this.props;
    const activePage = Number(this.props.match.params.page) || 1;
    const monsterPageSlice = monsterList.slice(
      (activePage - 1) * this.state.pageSize,
      activePage * this.state.pageSize
    );
    const numPages = Math.ceil(monsterList.length / this.state.pageSize);
    const pager = (
      <Pagination
        floated="right"
        pointing
        secondary
        activePage={activePage}
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
            <MonsterList monsters={monsterPageSlice} />
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
  monsterList: bestiarySelectors.getFilteredMonsterList(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
