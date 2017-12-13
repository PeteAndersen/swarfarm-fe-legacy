import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getSlug } from 'services/monsters';

const ElementSwitcher = ({ family, prefer_awakened = true, ...props }) => {
  const elementOrder = ['fire', 'water', 'wind', 'light', 'dark'];
  const familyByElement = Object.values(family).reduce((accum, monster) => {
    const element = monster.element.toLowerCase();
    // Set object key to monster matching element, priority to the one that matches awakened preference
    if (monster.is_awakened === prefer_awakened || !accum[element]) {
      accum[element] = monster;
    }
    return accum;
  }, {});

  const menuItems = elementOrder.reduce((accum, element, idx) => {
    if (familyByElement[element]) {
      accum.push(
        <Menu.Item
          key={idx}
          as={Link}
          to={`/bestiary/${familyByElement[element].id}-${getSlug(familyByElement[element])}`}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/elements/${
              familyByElement[element].element
            }.png`}
            alt={familyByElement[element].element}
          />
        </Menu.Item>
      );
    }
    return accum;
  }, []);

  return <Menu.Menu {...props}>{menuItems}</Menu.Menu>;
};

export default ElementSwitcher;
