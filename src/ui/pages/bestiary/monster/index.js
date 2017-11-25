import React from 'react';

class MonsterPage extends React.Component {
  componentWillMount() {}

  render() {
    const { monster, match } = this.props;
    return <div>You are now viewing a monster! {JSON.stringify(match)}</div>;
  }
}

export default MonsterPage;
