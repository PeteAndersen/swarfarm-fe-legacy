import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <p>
    Bestiary Menu: <Link to="/bestiary">Monsters</Link>{' '}
    <Link to="/bestiary/dungeons">Dungeons</Link>
  </p>
);

export default Menu;
