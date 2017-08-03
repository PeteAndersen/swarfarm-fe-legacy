import { schema } from 'normalizr';

const craftMaterial = new schema.Entity('craftMaterials');
const source = new schema.Entity('sources');
const leaderSkill = new schema.Entity('leaderSkills');

const homunculusSkill = new schema.Entity('homunculusSkills', {
  craft_materials: [{ material: craftMaterial }],
});

const monster = new schema.Entity('monsters', {
  leader_skill: leaderSkill,
  craft_materials: [{ material: craftMaterial }],
  source: [source],
});
const monsterList = [monster];

const effect = new schema.Entity('effects');
const skill = new schema.Entity('skills', {
  effects: [{ effect }],
});
const skillList = [skill];

export default {
  monster,
  monsterList,
  homunculusSkill,
  skill,
  skillList,
};
