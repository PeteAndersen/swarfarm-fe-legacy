import React from 'react';
import { Image } from 'semantic-ui-react';

const SkillImage = ({ skill, ...props }) => (
  <Image src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`} {...props} />
);

export default SkillImage;
