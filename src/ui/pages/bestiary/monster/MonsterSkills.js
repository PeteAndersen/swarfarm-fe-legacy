import React from 'react';

import { Segment, Image, Item } from 'semantic-ui-react';

const Skill = ({ skill }) => (
  <Item>
    <Item.Image
      size="mini"
      src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
    />
    <Item.Content>
      <Item.Header>{skill.name}</Item.Header>
      <Item.Description>{skill.description}</Item.Description>
      <Item.Extra>
        {skill.multiplier_formula} {skill.hits ? `x${skill.hits} hits` : null}
      </Item.Extra>
    </Item.Content>
  </Item>
);

const MonsterSkills = ({ monster }) => {
  const skills = monster.skills.map(skill => <Skill skill={skill} />);

  return (
    <Segment>
      <Item.Group divided>{skills}</Item.Group>
    </Segment>
  );
};

export default MonsterSkills;
