import React from 'react';
import { Menu } from 'semantic-ui-react';

const Pager = ({ currentPage, numPages, handleClick }) => {
  const buttons = [];

  for (let x = 1; x <= numPages; x++) {
    buttons.push(
      <Menu.Item key={x} active={currentPage === x} onClick={handleClick}>
        {x}
      </Menu.Item>
    );
  }

  return (
    <Menu pagination>
      {buttons}
    </Menu>
  );
};

export default Pager;
