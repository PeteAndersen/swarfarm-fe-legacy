import React from 'react';

import { Segment, Image, Item, Label } from 'semantic-ui-react';

const Effect = ({ effect }) => {
  console.log(effect);
  const color = effect.is_buff ? 'blue' : 'red';

  if (effect.icon_filename) {
    return (
      <Label image color={color}>
        <Image src={`${process.env.PUBLIC_URL}/assets/buffs/${effect.icon_filename}`} />
        {effect.name}
      </Label>
    );
  } else {
    return <Label color={color}>{effect.name}</Label>;
  }
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
