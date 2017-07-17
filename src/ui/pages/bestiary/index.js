import React from "react";
import { connect } from "react-redux";

import { bestiaryActions } from "state/ducks/bestiary";

class Bestiary extends React.Component {
  componentWillMount() {
    // TODO: Smartly load.
    this.props.populateBestiary();
  }
  render() {
    return <p>This is the bestiary!</p>;
  }
}

const mapStateToProps = state => {
  return {
    ...state.bestiary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    populateBestiary: () => dispatch(bestiaryActions.populateBestiary())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bestiary);
