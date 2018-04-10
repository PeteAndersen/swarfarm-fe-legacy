import React from 'react';
import { Card, Image, Statistic, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Portrait } from 'ui/components/monsters';
import { SkillImage } from 'ui/components/skills';
import { getSlug, elementColor } from 'services/monsters';

const MonsterCard = ({ monster }) => {
  return (
    <Card
      as={Link}
      to={`/bestiary/${monster.id}-${getSlug(monster)}`}
      color={elementColor(monster)}
    >
      <Card.Content>
        <Portrait monster={monster} />
        <Card.Header>{monster.name}</Card.Header>
        <Card.Meta>
          <div>
            <Image
              avatar
              spaced="right"
              src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element.toLowerCase()}.png`}
            />{' '}
            {monster.element} {monster.archetype}
          </div>
          <Divider hidden />
          <Statistic.Group size="mini" widths="four">
            <Statistic label="HP" value={monster.max_lvl_hp} />
            <Statistic label="ATK" value={monster.max_lvl_attack} />
            <Statistic label="DEF" value={monster.max_lvl_defense} />
            <Statistic label="SPD" value={monster.speed} />
            <Statistic label="CRI Rate" value={`${monster.crit_rate}%`} />
            <Statistic label="CRI Dmg" value={`${monster.crit_damage}%`} />
            <Statistic label="RES" value={`${monster.resistance}%`} />
            <Statistic label="ACC" value={`${monster.accuracy}%`} />
          </Statistic.Group>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        {monster.skills.map((skill, index) => (
          <SkillImage key={index} skill={skill} tooltip size="mini" />
        ))}
      </Card.Content>
    </Card>
  );
};

export default MonsterCard;
