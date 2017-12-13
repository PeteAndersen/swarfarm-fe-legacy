import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
`;

const Star = ({ imageFilename, mini }) => {
  const OverlappingImage = styled.img`
    margin-right: ${mini ? '-6px' : '-10px'};
  `;
  return (
    <OverlappingImage
      height={mini ? '15px' : '20px'}
      src={`${process.env.PUBLIC_URL}/assets/stars/${imageFilename}`}
    />
  );
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
