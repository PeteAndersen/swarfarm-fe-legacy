import React from 'react';
import { Segment, Item, Loader } from 'semantic-ui-react';

import SkillPanel from './skill_panel';

const Skills = ({ skills }) => {
  return (
    <Segment>
      <Item.Group divided>
        {skills.map(
          (skill, idx) =>
            skill ? <SkillPanel key={idx} skill={skill} /> : <Loader key={idx} active />
        )}
      </Item.Group>
    </Segment>
  );
};

export default Skills;
