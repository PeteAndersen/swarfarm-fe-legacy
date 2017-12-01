const _magic_multipliers = [
  { '1': 1.0, max: 1.9958 },
  { '1': 1.5966, max: 3.03050646 },
  { '1': 2.4242774, max: 4.364426603 },
  { '1': 3.4914444, max: 5.941390935 },
  { '1': 4.7529032, max: 8.072330795 },
  { '1': 6.4582449, max: 10.97901633 }
];

export function calcActualStat(stat, stars, level) {
  const max_lvl = 10 + stars * 5;
  const stat_lvl_1 = Math.round(stat * _magic_multipliers[stars - 1]['1'], 0);
  const stat_lvl_max = Math.round(stat * _magic_multipliers[stars - 1]['max'], 0);

  if (level === 1) {
    return stat_lvl_1;
  } else if (level === max_lvl) {
    return stat_lvl_max;
  } else {
    // Use exponential function in format value=ae^(bx)
    // a=stat_lvl_1*e^(-b)

    const b_coeff = Math.log(stat_lvl_max / stat_lvl_1) / (max_lvl - 1);
    return Math.round(stat_lvl_1 * Math.exp(-b_coeff) * Math.exp(b_coeff * level));
  }
}
