import React from 'react';
import { Item, Segment } from 'semantic-ui-react';

import LeaderSkillImage, { generate_description } from 'ui/components/skills/LeaderSkillImage';

const LeaderSkillPanel = ({ skill }) => (
  <Segment>
    <Item.Group>
      <Item>
        <LeaderSkillImage as={Item.Image} skill={skill} size="mini" rounded />
        <Item.Content>
          <Item.Header>Leader Skill</Item.Header>
          <Item.Description>{generate_description(skill)}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  </Segment>
);

export default LeaderSkillPanel;
