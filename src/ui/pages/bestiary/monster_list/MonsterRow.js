import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Image, Icon } from 'semantic-ui-react';

import { getSlug } from 'services/monsters';

const MonsterCard = ({ monster }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/bestiary/${monster.id}-${getSlug(monster)}`}>
          <Image src={`${process.env.PUBLIC_URL}/assets/monsters/${monster.image_filename}`} />{' '}
          {monster.name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        {monster.base_stars}
        <Icon name="star" />
      </Table.Cell>
      <Table.Cell>{monster.element}</Table.Cell>
    </Table.Row>
  );
};

export default MonsterCard;
