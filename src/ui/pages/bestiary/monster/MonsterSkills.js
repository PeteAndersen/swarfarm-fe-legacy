import React from 'react';

import { Segment, Image, Item, Header, Label, List, Divider } from 'semantic-ui-react';

const Effect = ({ effect }) => {
  const color = effect.effect.is_buff ? 'blue' : 'red';

  if (effect.effect.icon_filename) {
    return (
      <Label image color={color}>
        <Image src={`${process.env.PUBLIC_URL}/assets/buffs/${effect.effect.icon_filename}`} />
        {effect.effect.name}
      </Label>
    );
  } else {
    return <Label color={color}>{effect.effect.name}</Label>;
  }
};

const Skill = ({ skill }) => {
  return (
    <Item>
      <Item.Image
        size="mini"
        src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
      />

      <Item.Content>
        <Item.Header>{skill.name}</Item.Header>
        <Item.Meta>
          {skill.effects.map((effect, idx) => <Effect key={idx} effect={effect} />)}
          {skill.aoe ? <Label>AOE</Label> : null}
        </Item.Meta>
        <Item.Description>{skill.description}</Item.Description>
        <Item.Extra>
          <Divider hidden />
          <Header size="small">
            Multiplier Formula:
            <Header.Subheader>
              {skill.multiplier_formula} {skill.hits ? `x${skill.hits} hits` : null}
            </Header.Subheader>
          </Header>
          <Divider hidden />
          <Header size="small">
            Level-Up Progress:
            <Header.Subheader>
              <List>
                {skill.level_progress_description.map(desc => <List.Item>{desc}</List.Item>)}
              </List>
            </Header.Subheader>
          </Header>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const MonsterSkills = ({ skills }) => {
  return (
    <Segment>
      <Item.Group divided>
        {skills.map((skill, idx) => <Skill key={idx} skill={skill} />)}
      </Item.Group>
    </Segment>
  );
};

export default MonsterSkills;
