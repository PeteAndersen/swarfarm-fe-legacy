import React from 'react';
import { Segment, Item, Loader } from 'semantic-ui-react';

import { SkillItem } from 'ui/components/skills';

const MonsterSkills = ({ skills }) => {
  return (
    <Segment>
      <Item.Group divided>
        {skills.map(
          (skill, idx) =>
            skill ? <SkillItem key={idx} skill={skill} /> : <Loader key={idx} active />
        )}
      </Item.Group>
    </Segment>
  );
};

export default MonsterSkills;
