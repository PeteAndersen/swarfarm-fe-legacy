import { normalize, schema } from "normalizr";

const craftMaterial = new schema.Entity("craftMaterials");
const source = new schema.Entity("sources");
const leaderSkill = new schema.Entity("leaderSkills");

const homunculusSkill = new schema.Entity("homunculusSkills", {
  craft_materials: [{ material: craftMaterial }]
});

const monster = new schema.Entity("monsters", {
  leader_skill: leaderSkill,
  craft_materials: [{ material: craftMaterial }],
  source: [source]
});
const monsterList = [monster];

const effect = new schema.Entity("effects");
const skill = new schema.Entity("skills", {
  effects: [{ effect: effect }]
});
const skillList = [skill];

const data = {
  id: 377,
  com2us_id: 6701,
  name: "Absorb Mana",
  description:
    "Attacks the enemy and recovers the HP by 30% of the damage dealt. This attack will deal more damage according to your MAX HP.",
  slot: 1,
  cooltime: null,
  hits: 1,
  passive: false,
  max_level: 7,
  level_progress_description: [
    "Damage +5%",
    "Damage +5%",
    "Damage +5%",
    "Damage +5%",
    "Damage +5%",
    "Damage +10%"
  ],
  effects: [
    {
      effect: {
        id: 35,
        url: "http://127.0.0.1:8000/api/v2/skill-effects/35.json",
        name: "Heal",
        is_buff: true,
        description: "Increases ally's HP",
        icon_filename: ""
      },
      aoe: false,
      single_target: false,
      self_effect: true,
      chance: null,
      on_crit: false,
      on_death: false,
      random: false,
      quantity: 30,
      all: false,
      self_hp: false,
      target_hp: false,
      damage: true,
      note: ""
    }
  ],
  multiplier_formula:
    '1.8*<mark>ATK</mark> + 0.12*<mark data-toggle="tooltip" data-placement="top" title="Attacker\'s HP in raw hit points">MAX HP</mark>',
  multiplier_formula_raw:
    '[["ATK", "*", 1.8], ["+"], ["ATTACK_TOT_HP", "*", 0.12]]',
  icon_filename: "skill_icon_0006_8_2.png",
  used_on: [309, 310]
};

const normalized = normalize(data, skill);
console.log(normalized);

export default {
  monster,
  monsterList,
  homunculusSkill,
  skill,
  skillList
};
