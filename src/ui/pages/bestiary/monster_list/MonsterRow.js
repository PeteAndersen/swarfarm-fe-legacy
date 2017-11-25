import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Image, Icon } from 'semantic-ui-react';
import slugify from 'slugify';

const MonsterCard = ({ monster }) => {
  const slug = slugify(monster.name).toLowerCase();

  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/bestiary/${monster.id}-${slug}`}>
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
