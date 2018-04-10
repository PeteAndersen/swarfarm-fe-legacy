import React from 'react';

// TODO: make this an image w/ tooltip
const LeaderSkill = ({ monster }) => {
  if (monster.leader_skill) {
    return (
      <span>
        {monster.leader_skill.area} {monster.leader_skill.element} {monster.leader_skill.attribute}{' '}
        {monster.leader_skill.amount}%
      </span>
    );
  }
  return null;
};

export default LeaderSkill;
