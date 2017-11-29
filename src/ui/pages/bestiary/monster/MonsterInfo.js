import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

import { Portrait } from 'ui/components/monsters';

const MonsterInfo = ({ monster }) => {
  const awakens_from_link = monster.awakens_from ? (
    <Card.Meta>
      Awakens from{' '}
      <Link
        to={`/bestiary/${
          monster.awakens_from.id
        }-${monster.awakens_from.element.toLowerCase()}-${monster.awakens_from.name.toLowerCase()}`}
      >
        {monster.awakens_from.element} {monster.awakens_from.name}
      </Link>
    </Card.Meta>
  ) : null;

  const awakens_to_link = monster.awakens_to ? (
    <Card.Meta>
      Awakens to{' '}
      <Link to={`/bestiary/${monster.awakens_to.id}-${monster.awakens_to.name.toLowerCase()}`}>
        {monster.awakens_to.name}
      </Link>
    </Card.Meta>
  ) : null;

  return (
    <Card fluid>
      <Card.Content>
        <Portrait monster={monster} />
        <Card.Header>{monster.name}</Card.Header>
        <Card.Meta>
          <Image
            size="mini"
            spaced="right"
            src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element.toLowerCase()}.png`}
          />
          <span>{monster.archetype}</span>
        </Card.Meta>
        {awakens_from_link}
        {awakens_to_link}
      </Card.Content>
    </Card>
  );
};
export default MonsterInfo;
