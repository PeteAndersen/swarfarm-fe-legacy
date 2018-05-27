import React from 'react';
import { Card, Header, Image, Statistic, Divider, List, Popup, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Portrait } from 'ui/components/monsters';
import { SkillImage, SkillPanel } from 'ui/components/skills';
import { getSlug, elementColor } from 'services/monsters';

const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: flex-start;
`;

const SkillItem = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MonsterCard = ({ monster }) => {
  return (
    <Card
      as={Link}
      to={`/bestiary/${monster.id}-${getSlug(monster)}`}
      color={elementColor(monster)}
    >
      <Card.Content>
        <div>
          <Header sub floated="right">
            {monster.archetype}
          </Header>
          <Header floated="left">
            <Image
              inline
              size="tiny"
              spaced="right"
              src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element.toLowerCase()}.png`}
            />
            {monster.name}
          </Header>
        </div>
        <Divider hidden clearing />
        <Portrait monster={monster} size="tiny" />
        <Card.Meta>
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
        <SkillContainer>
          {monster.skills.map((skill, index) => (
            <Popup
              key={index}
              hoverable
              trigger={
                <SkillItem>
                  <SkillImage skill={skill} size="mini" rounded bordered />
                  {skill.name}
                </SkillItem>
              }
            >
              <SkillPanel skill={skill} />
            </Popup>
          ))}
        </SkillContainer>
      </Card.Content>
    </Card>
  );
};

export default MonsterCard;
