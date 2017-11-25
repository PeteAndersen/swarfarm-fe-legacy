import React from 'react';

const MonsterPage = ({ monster, match }) => (
  <div>You are now viewing a monster! {JSON.stringify(match)}</div>
);

export default MonsterPage;
