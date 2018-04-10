import React from 'react';
import { Image, Popup } from 'semantic-ui-react';

import SkillPanel from './SkillPanel';

const SkillImage = ({ skill, tooltip, ...props }) => {
  const img = (
    <Image src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`} {...props} />
  );

  return tooltip ? (
    <Popup hoverable trigger={img}>
      <SkillPanel skill={skill} />
    </Popup>
  ) : (
    img
  );
};

export default SkillImage;
