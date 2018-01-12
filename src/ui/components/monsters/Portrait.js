import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Stars from './Stars';

const PortraitContainer = styled.div`
  float: left;
  position: relative;
  border-radius: 5px;
  border: 1px solid black;
  margin-right: 5px;
`;

const Portrait = ({ monster, level, stars, size }) => {
  return (
    <PortraitContainer>
      <Image
        size={size}
        rounded
        src={`${process.env.PUBLIC_URL}/assets/monsters/${monster.image_filename}`}
      />
      <Stars
        stars={stars || monster.base_stars}
        awakened={monster.is_awakened}
        can_awaken={monster.can_awaken}
      />
    </PortraitContainer>
  );
};
export default Portrait;
