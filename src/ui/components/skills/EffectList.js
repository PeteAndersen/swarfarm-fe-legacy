import React from 'react';
import { List, Image, Header } from 'semantic-ui-react';

const Effect = ({ effect, show_image = true }) => {
  const color = effect.effect.is_buff ? 'blue' : 'red';

  return (
    <List.Item>
      {show_image ? (
        <Image
          avatar
          src={
            effect.effect.icon_filename
              ? `${process.env.PUBLIC_URL}/assets/buffs/${effect.effect.icon_filename}`
              : null
          }
        />
      ) : null}
      <List.Content>
        <List.Header>
          <Header color={color} size="small">
            {effect.effect.name}
          </Header>
        </List.Header>
        <List.Description>{effect_detail(effect)}</List.Description>
      </List.Content>
    </List.Item>
  );
};

const EffectList = ({ effects }) => {
  // If skill has no effects with icons, do not display the img tag to avoid awkward whitespace
  const has_effect_icons = effects.reduce(
    (accum, effect) => accum || effect.effect.icon_filename,
    false
  );

  return (
    <List>{effects.map(effect => <Effect effect={effect} show_image={has_effect_icons} />)}</List>
  );
};

const effect_detail = effect => {
  const extra_effects = [];

  if (effect.quantity) {
    if (effect.effect.icon_filename) {
      // Effect is applied to monsters, quantity indicates turn duration
      extra_effects.push(`${effect.quantity} turn${effect.quantity > 1 ? 's' : ''}`);
    } else if (effect.all) {
      extra_effects.push('All');
    } else {
      // For other effects, quantity may refer to other values
      let quantity = `${effect.quantity}%`;

      if (effect.self_hp) {
        quantity += ' of Self HP';
      }
      if (effect.target_hp) {
        quantity += ' of Target HP';
      }
      if (effect.damage) {
        quantity += ' of Damage';
      }

      extra_effects.push(quantity);
    }
  }
  if (effect.aoe) {
    extra_effects.push('AOE');
  }
  if (effect.self_effect) {
    extra_effects.push('Self Effect');
  }
  if (effect.chance) {
    extra_effects.push(`${effect.chance}% Chance`);
  }
  if (effect.on_death) {
    extra_effects.push('On Death');
  }
  if (effect.on_crit) {
    extra_effects.push('On Crit');
  }
  if (effect.random) {
    extra_effects.push('Random');
  }

  return extra_effects.join(' - ');
};

export default EffectList;
