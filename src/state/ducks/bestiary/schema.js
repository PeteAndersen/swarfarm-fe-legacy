import { schema } from 'normalizr';

const craftMaterial = new schema.Entity('craftMaterials');
const source = new schema.Entity('sources');
const leaderSkill = new schema.Entity('leaderSkills');

const effect = new schema.Entity('effects');
const skill = new schema.Entity('skills', {
  effects: [{ effect }]
});
const skillList = [skill];

const monster = new schema.Entity('monsters', {
  skills: skillList,
  leader_skill: leaderSkill,
  craft_materials: [{ material: craftMaterial }],
  source: [source]
});
const monsterList = [monster];

const homunculusSkill = new schema.Entity('homunculusSkills', {
  craft_materials: [{ material: craftMaterial }],
  skill,
  prerequisites: skillList,
  used_on: monsterList
});

// Extend schemas with circular references
monster.define({
  awakens_from: monster,
  awakens_to: monster
});

skill.define({
  used_on: monsterList
});

export default {
  monster,
  monsterList,
  homunculusSkill,
  skill,
  skillList
};
