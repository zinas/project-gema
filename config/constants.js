module.exports.constants = {
  COMBAT: {
    MAX_ROUNDS: 100
  },
  STATS: {
    BASE_DAMAGE: 4,
    TO_HIT: 50,
    BASE_CRIT: 95,
    CRIT_MULTIPLIER: 1.5,
    BASE_GRAZE: 70,
    GRAZE_MULTIPLIER: 0.5
  },
  LEVELUP: {
    ATTRIBUTE_POINTS: 3,
    SKILL_POINTS: 2
  },
  PROFESSIONS: [
    {
      ID: 'fix',
      LABEL: 'Fixer',
      HP_PER_LEVEL: 10,
      ATTACK_PER_LEVEL: 10,
      DEFENCE_PER_LEVEL: 6,
    },

    {
      ID: 'sol',
      LABEL: 'Soldier',
      HP_PER_LEVEL: 10,
      ATTACK_PER_LEVEL: 8,
      DEFENCE_PER_LEVEL: 8,
    },

    {
      ID: 'med',
      LABEL: 'Medic',
      HP_PER_LEVEL: 10,
      ATTACK_PER_LEVEL: 6,
      DEFENCE_PER_LEVEL: 10,
    }
  ]
};