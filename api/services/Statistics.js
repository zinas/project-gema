var math = require('mathjs');

module.exports = {
  generate: function (character) {
    var stats = {
      aim: character.aim,
      speed: character.speed,
      stamina: character.stamina,

      maxHP: 0,

      attack: 0,
      defence: 0,
      damage: 0,
      armor: 0,

      hitThreshold: sails.config.constants.STATS.TO_HIT,

      grazeThreshold: sails.config.constants.STATS.BASE_GRAZE,
      grazeMult: sails.config.constants.STATS.GRAZE_MULTIPLIER,

      critThreshold: sails.config.constants.STATS.BASE_CRIT,
      critMult: sails.config.constants.STATS.CRIT_MULTIPLIER
    }, statsFromItems, statsFromSkills;

    statsFromItems = this.getStatsFromItems(character);
    stats.aim += statsFromItems.aim;
    stats.speed += statsFromItems.speed;
    stats.stamina += statsFromItems.stamina;

    statsFromSkills = this.getStatsFromSkills(character);
    stats.aim += statsFromSkills.aim;
    stats.speed += statsFromSkills.speed;
    stats.stamina += statsFromSkills.stamina;

    stats.attack = this.calculateAttack(stats, character);
    stats.defence = this.calculateDefence(stats, character);
    stats.damage = this.calculateDamage(stats, character);
    stats.armor = this.calculateArmor(stats, character);

    console.log(sails.config.constants.ROUNDING_DIGITS);

    return stats;
  },

  calculateAttack: function (stats, character) {
    return math.round(
      character.level *
      character.professionStats().ATTACK_PER_LEVEL *
      (1 + ( (stats.aim*3/4 + stats.speed/4) - 10)/100 )
    , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateDefence: function (stats, character) {
    return math.round(
      character.level *
      character.professionStats().DEFENCE_PER_LEVEL *
      (1 + ( (stats.speed*3/4 + stats.stamina/4) - 10)/100 )
    , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateDamage: function (stats, character) {
    var baseDamage = sails.config.constants.STATS.BASE_DAMAGE;
    if ( character.weapon ) {
      baseDamage = character.weapon.damage;
    }

    return math.round(
      baseDamage * (1 + ( ( (stats.aim-10)/10 + (stats.speed-10)/20) )/100 )
      , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateArmor: function (stats, character) {
    var baseArmor = 0;
    if ( character.armor ) {
      baseArmor = character.armor.protection;
    }

    return math.round(
      baseArmor * (1 + ( (stats.stamina - 10)/10 )/100 )
      , sails.config.constants.ROUNDING_DIGITS);
  },

  getStatsFromSkills: function (character) {
    var stats = {
      aim: 0,
      speed: 0,
      stamina: 0
    };

    character.skills.forEach(function (skill) {
      if ( skill.details.action.type === 'stat' ) {
        stats[skill.details.action.target] += skill.details.action.value * skill.level;
      }
    });

    return stats;
  },
  getStatsFromItems: function (character) {
    var stats = {
      aim: 0,
      speed: 0,
      stamina: 0
    };

    if ( character.weapon && character.weapon.modifiers ) {
      character.weapon.modifiers.forEach(function (mod) {
        if ( mod.type === 'stat' ) {
          stats[modifer.target] += mod.value;
        }
      });
    }

    if ( character.armor && character.armor.modifiers ) {
      character.armor.modifiers.forEach(function (mod) {
        if ( mod.type === 'stat' ) {
          stats[modifer.target] += mod.value;
        }
      });
    }

    if ( character.implant && character.implant.modifiers ) {
      character.implant.modifiers.forEach(function (mod) {
        if ( mod.type === 'stat' ) {
          stats[modifer.target] += mod.value;
        }
      });
    }

    return stats;
  }
};