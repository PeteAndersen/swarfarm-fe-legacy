import React from 'react';
import { Header, Divider, List } from 'semantic-ui-react';

import { EffectList } from 'ui/components/skills';

const SkillPanel = ({ skill }) => (
  <div>
    <Header>{skill.name}</Header>
    <EffectList effects={skill.effects} />
    <Divider hidden fitted />
    <p>{skill.description}</p>
    {skill.cooltime ? (
      <p>
        Cooltime: {skill.cooltime} turn{skill.cooltime > 1 ? 's' : ''}
      </p>
    ) : null}
    {skill.multiplier_formula ? <Header size="small">Multiplier Formula:</Header> : null}
    {skill.multiplier_formula} {skill.hits ? `x${skill.hits} hits` : null}
    <Header size="small">Level-Up Progress:</Header>
    <List>
      {skill.level_progress_description.map((desc, idx) => <List.Item key={idx}>{desc}</List.Item>)}
    </List>
  </div>
);

export default SkillPanel;
