import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

const StarContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
`;

const OverlappingImage = styled(Image)`
  margin-right: -10px;
`;

const Star = ({ imageFilename }) => {
  return (
    <OverlappingImage
      height="20px"
      src={`${process.env.PUBLIC_URL}/assets/stars/${imageFilename}`}
    />
  );
};
const Stars = ({ stars: num_stars, awakened, can_awaken }) => {
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
    stars.push(<Star key={x} imageFilename={imageFilename} />);
  }
  return <StarContainer basic>{stars}</StarContainer>;
};

export default Stars;
