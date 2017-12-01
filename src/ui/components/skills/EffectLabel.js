import React from 'react';
import { Label, Image } from 'semantic-ui-react';

const EffectLabel = ({ effect }) => {
  const color = effect.effect.is_buff ? 'blue' : 'red';

  if (effect.effect.icon_filename) {
    return (
      <Label color={color} image>
        <Image src={`${process.env.PUBLIC_URL}/assets/buffs/${effect.effect.icon_filename}`} />
        {effect.effect.name} ({effect.quantity} {`turn${effect.quantity > 1 ? 's' : ''}`})
      </Label>
    );
  } else {
    return <Label color={color}>{effect.effect.name}</Label>;
  }
};

export default EffectLabel;
