import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getSlug } from 'services/monsters';

const ElementSwitcher = ({ family, preferAwakened = false, activeElement, ...props }) => {
  const elementOrder = ['fire', 'water', 'wind', 'light', 'dark'];
  const familyByElement = Object.values(family).reduce((accum, monster) => {
    const element = monster.element.toLowerCase();
    // Set object key to monster matching element, priority to the one that matches awakened preference
    if (monster.is_awakened === preferAwakened || !accum[element]) {
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
          active={activeElement === element}
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

ElementSwitcher.propTypes = {
  family: PropTypes.object.isRequired,
  preferAwakened: PropTypes.bool,
  activeElement: PropTypes.string
};

export default ElementSwitcher;
