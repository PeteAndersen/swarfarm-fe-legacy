import React from 'react';
import ReactDOM from 'react-dom';

import LeaderSkill from './LeaderSkill';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LeaderSkill />, div);
});
