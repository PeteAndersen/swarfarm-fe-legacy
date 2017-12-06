import React from 'react';
import { Item, Header, List } from 'semantic-ui-react';

import EffectList from './EffectList';

const SkillItem = ({ skill }) => (
  <Item>
    <Item.Image
      size="mini"
      rounded
      src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
    />

    <Item.Content>
      <Item.Header>{skill.name}</Item.Header>
      <Item.Meta>
        <EffectList effects={skill.effects} />
      </Item.Meta>
      <Item.Description>{skill.description}</Item.Description>
      {skill.cooltime ? (
        <Item.Description>
          Cooltime: {skill.cooltime} turn{skill.cooltime > 1 ? 's' : ''}
        </Item.Description>
      ) : null}
      <Item.Description>
        <Header size="small">
          Multiplier Formula:
          <Header.Subheader>
            {skill.multiplier_formula} {skill.hits ? `x${skill.hits} hits` : null}
          </Header.Subheader>
        </Header>
      </Item.Description>
      <Item.Description>
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
      </Item.Description>
    </Item.Content>
  </Item>
);

export default SkillItem;
