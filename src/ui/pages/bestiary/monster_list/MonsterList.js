import React from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';

import Portrait from 'ui/components/monsters/Portrait';

//import MonsterCard from './MonsterCard';

const MonsterRow = ({ monster }) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Portrait monster={monster} size="tiny" />
    </Table.Cell>
    <Table.Cell>{monster.name}</Table.Cell>
    <Table.Cell>
      {monster.base_stars}
      <Icon name="star" />
    </Table.Cell>
    <Table.Cell>
      <Image src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element}.png`} size="mini" />
    </Table.Cell>
    <Table.Cell>{monster.archetype}</Table.Cell>
    <Table.Cell />
  </Table.Row>
);

const MonsterList = ({ monsters }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Stars</Table.HeaderCell>
        <Table.HeaderCell>Element</Table.HeaderCell>
        <Table.HeaderCell>Archetype</Table.HeaderCell>
        <Table.HeaderCell>Skills</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {monsters.map(monster => <MonsterRow key={monster.id} monster={monster} />)}
    </Table.Body>
  </Table>
);

export default MonsterList;
