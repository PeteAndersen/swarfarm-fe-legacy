import React from 'react';
import { Item, Segment, Image } from 'semantic-ui-react';

const generate_image_filename = skill => {
  let suffix;

  if (skill.area === 'Element') {
    suffix = `_${skill.element}`;
  } else if (skill.area === 'General') {
    suffix = '';
  } else {
    suffix = `_${skill.area}`;
  }

  return `leader_skill_${skill.attribute.replace(' ', '_')}${suffix}.png`;
};

const generate_description = skill => {
  let condition;

  switch (skill.area) {
    case 'Dungeon':
      condition = 'in the Dungeons ';
      break;
    case 'Arena':
      condition = 'in the Arena ';
      break;
    case 'Guild':
      condition = 'in the Guild Battles ';
      break;
    case 'Element':
      condition = `with ${skill.element} attribute `;
      break;
    default:
      condition = '';
  }

  return `Increase the ${skill.attribute} of all monsters ${condition}by ${skill.amount}%`;
};

const LeaderSkill = ({ skill }) => {
  const image_filename = '';
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image
            size="mini"
            rounded
            src={`${process.env.PUBLIC_URL}/assets/skills/leader/${generate_image_filename(skill)}`}
          />
          <Item.Content>
            <Item.Header>Leader Skill</Item.Header>
            <Item.Description>{generate_description(skill)}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
export default LeaderSkill;
