import React from 'react';
import { Popup } from 'semantic-ui-react';

import BorderedImage from 'ui/components/BorderedImage';
import SkillPanel from './SkillPanel';

const SkillImage = ({ skill, tooltip, ...props }) => {
  const img = (
    <BorderedImage
      src={`${process.env.PUBLIC_URL}/assets/skills/${skill.icon_filename}`}
      {...props}
    />
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
