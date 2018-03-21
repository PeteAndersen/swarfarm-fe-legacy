import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

const StarContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
`;

const OverlappingImage = styled.img`
  margin-right: -10%;
  height: 22%;
  width: auto;
`;

const Star = ({ imageFilename, mini }) => {
  return <OverlappingImage src={`${process.env.PUBLIC_URL}/assets/stars/${imageFilename}`} />;
};

const Stars = ({ stars: num_stars, awakened, can_awaken, mini }) => {
  const stars = [];
  let imageFilename;

  if (awakened) {
    imageFilename = 'star-awakened.png';
  } else if (can_awaken) {
    imageFilename = 'star-unawakened.png';
  } else {
    imageFilename = 'star-fodder.png';
  }

  for (let x = 0; x < num_stars; x++) {
    stars.push(<Star key={x} imageFilename={imageFilename} mini={mini} />);
  }
  return <StarContainer>{stars}</StarContainer>;
};

export default Stars;
