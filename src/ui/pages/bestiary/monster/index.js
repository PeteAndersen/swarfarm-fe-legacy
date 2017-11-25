import React from 'react';
import { connect } from 'react-redux';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';

class MonsterPage extends React.Component {
  componentWillMount() {
    this.props.getMonster(this.props.match.params.id);
  }

  render() {
    const { monster, match } = this.props;
    return (
      <div>
        You are now viewing a monster! <p>{JSON.stringify(match)}</p>
        <pre>{JSON.stringify(monster, null, 2)}</pre>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonster: id => dispatch(bestiaryActions.getMonster(id))
});

const mapStateToProps = (state, ownProps) => ({
  monster: bestiarySelectors.getMonster(state, ownProps.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(MonsterPage);
