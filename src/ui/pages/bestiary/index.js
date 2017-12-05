import React from 'react';

import { connect } from 'react-redux';
import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';

import Menu from './Menu';
import Routes from './Routes';

class Bestiary extends React.Component {
  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);

    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastPopulated: bestiarySelectors.lastPopulated(state)
});

const mapDispatchToProps = dispatch => ({
  populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
