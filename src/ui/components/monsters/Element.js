import React from 'react';
import { Image } from 'semantic-ui-react';

const Element = ({ monster, ...props }) => (
  <Image
    src={`${process.env.PUBLIC_URL}/assets/elements/${monster.element.toLowerCase()}.png`}
    {...props}
  />
);

export default Element;
