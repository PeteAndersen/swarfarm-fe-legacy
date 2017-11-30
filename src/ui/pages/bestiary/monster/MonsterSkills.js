import React from 'react';

import { Segment, Image, Item } from 'semantic-ui-react';

const Effect = ({ effect }) => {
  console.log(effect);
  if (effect.icon_filename) {
    return <Image avatar src={`${process.env.PUBLIC_URL}/assets/buffs/${effect.icon_filename}`} />;
  }
  return <span>{effect.name}</span>;
};

const Skill = ({ skill, effects }) => {
  return (
    <Item>
      <Item.Image
        size="mini"
        src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
      />
      <Item.Content>
        <Item.Header>{skill.name}</Item.Header>
        <Item.Meta>
          {skill.effects.map((effect, idx) => <Effect key={idx} effect={effects[effect.effect]} />)}
        </Item.Meta>
        <Item.Description>{skill.description}</Item.Description>
        <Item.Extra>
          {skill.multiplier_formula} {skill.hits ? `x${skill.hits} hits` : null}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
const MonsterSkills = ({ skillIds, skills, effects }) => {
  return (
    <Segment>
      <Item.Group divided>
        {skillIds.map((skillId, idx) => (
          <Skill key={idx} skill={skills[skillId]} effects={effects} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default MonsterSkills;
