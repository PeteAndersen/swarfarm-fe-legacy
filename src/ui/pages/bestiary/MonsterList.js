import React from 'react';
import { Table } from 'semantic-ui-react';

import MonsterRow from './MonsterRow';

const MonsterList = ({ monsters }) =>
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Monster</Table.HeaderCell>
        <Table.HeaderCell>Base Stars</Table.HeaderCell>
        <Table.HeaderCell>Element</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {monsters.map(monster => <MonsterRow key={monster.id} monster={monster} />)}
    </Table.Body>
  </Table>;

export default MonsterList;
