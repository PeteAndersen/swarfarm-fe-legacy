import React from 'react';
import { Item, Divider, Header, List, Label } from 'semantic-ui-react';

import EffectLabel from './EffectLabel';

const SkillItem = ({ skill }) => (
  <Item>
    <Item.Image
      size="mini"
      src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
    />

    <Item.Content>
      <Item.Header>{skill.name}</Item.Header>
      <Item.Meta>
        {skill.effects.map((effect, idx) => <EffectLabel key={idx} effect={effect} />)}
        {skill.aoe ? <Label horizontal>AOE</Label> : null}
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
              {skill.level_progress_description.map((desc, idx) => (
                <List.Item key={idx}>{desc}</List.Item>
              ))}
            </List>
          </Header.Subheader>
        </Header>
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default SkillItem;
