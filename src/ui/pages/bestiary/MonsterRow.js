import React from 'react';
import { Table, Image, Icon } from 'semantic-ui-react';

const MonsterCard = ({ monster }) =>
  (<Table.Row>
    <Table.Cell>
      <Image src={`${process.env.PUBLIC_URL}/assets/monsters/${monster.image_filename}`} />{' '}
      {monster.name}
    </Table.Cell>
    <Table.Cell>
      {monster.base_stars}
      <Icon name="star" />
    </Table.Cell>
    <Table.Cell>
      {monster.element}
    </Table.Cell>
  </Table.Row>);

export default MonsterCard;
