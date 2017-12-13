import slugify from 'slugify';

const magic_multipliers = [
  { 1: 1.0, 15: 1.9958 },
  { 1: 1.5966, 20: 3.03050646 },
  { 1: 2.4242774, 25: 4.364426603 },
  { 1: 3.4914444, 30: 5.941390935 },
  { 1: 4.7529032, 35: 8.072330795 },
  { 1: 6.4582449, 40: 10.97901633 }
];

export const calcActualStat = (stat, stars, level) => {
  const max_lvl = 10 + stars * 5;
  const stat_lvl_1 = Math.round(stat * magic_multipliers[stars - 1][1], 0);
  const stat_lvl_max = Math.round(stat * magic_multipliers[stars - 1][max_lvl], 0);

  if (level === 1) {
    return stat_lvl_1;
  } else if (level === max_lvl) {
    return stat_lvl_max;
  } else {
    // Use exponential function in format value=ae^(bx)
    // a = stat_lvl_1*e^(-b)
    // x = level
    const b_coeff = Math.log(stat_lvl_max / stat_lvl_1) / (max_lvl - 1);
    return Math.round(stat_lvl_1 * Math.exp(-b_coeff) * Math.exp(b_coeff * level));
  }
};

export const maxLevel = stars => stars * 5 + 10;

export const getSlug = monster => slugify(monster.name).toLowerCase();
