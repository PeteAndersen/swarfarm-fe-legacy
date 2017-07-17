import React from "react";
import { connect } from "react-redux";
import { Container, Dimmer, Loader } from "semantic-ui-react";

import { bestiaryActions } from "state/ducks/bestiary";
import MonsterList from "./MonsterList";

class Bestiary extends React.Component {
  componentWillMount() {
    // Check if bestiary data is older than an hour
    const lastPopulated = new Date(this.props.lastPopulated);
    console.log(new Date() - lastPopulated);
    if (new Date() - lastPopulated >= 60 * 60 * 1000) {
      this.props.populateBestiary();
    }
  }
  render() {
    const { isPopulating, wasPopulated, isLoading, entities } = this.props;

    return (
      <div>
        <Container>
          <Loader active={isPopulating && !wasPopulated}>
            Populating bestiary...
          </Loader>
          <MonsterList monsters={entities.monsters} />
        </Container>
      </div>
    );
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
