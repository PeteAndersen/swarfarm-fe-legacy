import { normalize, schema } from "normalizr";

const effect = new schema.Entity("effects");
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

const data = JSON.parse(
  //'{"id":551,"url":"http://127.0.0.1:8000/api/v2/monsters/551/?format=json","com2us_id":11913,"family_id":11900,"name":"Acasis","image_filename":"unit_icon_0009_2_4.png","element":"Wind","archetype":"Support","base_stars":5,"obtainable":true,"can_awaken":true,"is_awakened":true,"awaken_bonus":"Strengthen Skill: Force Field","skills":[967,971,979],"skill_ups_to_max":10,"leader_skill":{"id":119,"url":"http://127.0.0.1:8000/api/v2/leader-skills/119/?format=json","attribute":"Resistance","amount":50,"area":"Element","element":"Wind"},"homunculus_skills":[],"base_hp":7020,"base_attack":646,"base_defense":339,"speed":104,"crit_rate":15,"crit_damage":50,"resistance":15,"accuracy":0,"max_lvl_hp":9555,"max_lvl_attack":878,"max_lvl_defense":461,"awakens_from":550,"awakens_to":null,"awaken_mats_fire_low":0,"awaken_mats_fire_mid":0,"awaken_mats_fire_high":0,"awaken_mats_water_low":0,"awaken_mats_water_mid":0,"awaken_mats_water_high":0,"awaken_mats_wind_low":0,"awaken_mats_wind_mid":0,"awaken_mats_wind_high":0,"awaken_mats_light_low":0,"awaken_mats_light_mid":0,"awaken_mats_light_high":0,"awaken_mats_dark_low":0,"awaken_mats_dark_mid":0,"awaken_mats_dark_high":0,"awaken_mats_magic_low":0,"awaken_mats_magic_mid":0,"awaken_mats_magic_high":0,"source":[{"id":3,"url":"http://127.0.0.1:8000/api/v2/monster-sources/3/?format=json","name":"Legendary Scroll","description":"","farmable_source":false},{"id":7,"url":"http://127.0.0.1:8000/api/v2/monster-sources/7/?format=json","name":"Wind Scroll","description":"","farmable_source":false},{"id":38,"url":"http://127.0.0.1:8000/api/v2/monster-sources/38/?format=json","name":"Mystical Scroll or Crystal Summon","description":"","farmable_source":false}],"fusion_food":false,"resources":{"Wikia":"http://summonerswar.wikia.com/wiki/Sylphid_(Wind)","summonerswar.co":"http://summonerswar.co/wind-sylphid-acasis","SummonersWarMonsters.com":"http://www.summonerswarmonsters.com/wind/acasis"},"homunculus":false,"craft_cost":null,"craft_materials":[]}'
  '{"id":1007,"url":"http://127.0.0.1:8000/api/v2/monsters/1007/?format=json","com2us_id":1000102,"family_id":1000100,"name":"Homunculus","image_filename":"unit_icon_0042_1_1.png","element":"Fire","archetype":"Attack","base_stars":5,"obtainable":true,"can_awaken":true,"is_awakened":false,"awaken_bonus":"","skills":[1584,1588,1595],"skill_ups_to_max":13,"leader_skill":null,"homunculus_skills":[14,15,16,17,18,19,20,21,22,24,25,26,27],"base_hp":7020,"base_attack":533,"base_defense":452,"speed":100,"crit_rate":15,"crit_damage":50,"resistance":15,"accuracy":0,"max_lvl_hp":9555,"max_lvl_attack":725,"max_lvl_defense":615,"awakens_from":null,"awakens_to":1010,"awaken_mats_fire_low":0,"awaken_mats_fire_mid":10,"awaken_mats_fire_high":20,"awaken_mats_water_low":0,"awaken_mats_water_mid":0,"awaken_mats_water_high":0,"awaken_mats_wind_low":0,"awaken_mats_wind_mid":0,"awaken_mats_wind_high":0,"awaken_mats_light_low":0,"awaken_mats_light_mid":0,"awaken_mats_light_high":0,"awaken_mats_dark_low":0,"awaken_mats_dark_mid":0,"awaken_mats_dark_high":0,"awaken_mats_magic_low":0,"awaken_mats_magic_mid":5,"awaken_mats_magic_high":15,"source":[],"fusion_food":false,"resources":{"Wikia":"","summonerswar.co":"","SummonersWarMonsters.com":"http://www.summonerswarmonsters.com/fire/homunculus"},"homunculus":true,"craft_cost":100000,"craft_materials":[{"material":{"id":13,"url":"http://127.0.0.1:8000/api/v2/craft-materials/13/?format=json","name":"Frozen Water Crystal","icon_filename":"crystal_water.png"},"quantity":250},{"material":{"id":14,"url":"http://127.0.0.1:8000/api/v2/craft-materials/14/?format=json","name":"Flaming Fire Crystal","icon_filename":"crystal_fire.png"},"quantity":500},{"material":{"id":15,"url":"http://127.0.0.1:8000/api/v2/craft-materials/15/?format=json","name":"Whirling Wind Crystal","icon_filename":"crystal_wind.png"},"quantity":250},{"material":{"id":18,"url":"http://127.0.0.1:8000/api/v2/craft-materials/18/?format=json","name":"Condensed Magic Crystal","icon_filename":"crystal_magic.png"},"quantity":500}]}'
);

const normalizedData = normalize(data, monster);

console.log(normalizedData);
