var math = require('mathjs');

module.exports = {
  generate: function (character) {
    var stats = {
      aim: character.aim,
      speed: character.speed,
      stamina: character.stamina,

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
    stats = this._extendStats(stats, statsFromItems);

    if ( character.skills ) {
      statsFromSkills = this.getStatsFromSkills(character);
      stats = this._extendStats(stats, statsFromSkills);
    }

    stats.attack = this.calculateAttack(stats, character);
    stats.defence = this.calculateDefence(stats, character);
    stats.damage = this.calculateDamage(stats, character);
    stats.armor = this.calculateArmor(stats, character);

    return stats;
  },

  _extendStats: function (original, addition) {
    var keys = [
      'aim', 'speed', 'stamina', 'attack', 'defence',
      'hitThreshold', 'grazeThreshold', 'grazeMult',
      'critThreshold', 'critMult', 'armor', 'damage'
    ];

    keys.forEach(function (key) {
      if ( addition[key] ) {
        original[key] += addition[key];
      }
    });

    return original;
  },

  calculateAttack: function (stats, character) {

    return math.round(
      stats.attack +
      character.level *
      character.baseStats().attack *
      (1 + ( (stats.aim*3/4 + stats.speed/4) - 10)/100 )
    , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateDefence: function (stats, character) {
    return math.round(
      stats.defence +
      character.level *
      character.baseStats().defence *
      (1 + ( (stats.speed*3/4 + stats.stamina/4) - 10)/100 )
    , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateDamage: function (stats, character) {
    var baseDamage = sails.config.constants.STATS.BASE_DAMAGE;
    if ( character.weapon ) {
      baseDamage = character.weapon.damage;
    }

    if (stats.damage) {
      baseDamage += stats.damage;
    }

    return math.round(
      baseDamage * (1 + ( ( (stats.aim-10)/10 + (stats.speed-10)/20) )/100 )
      , sails.config.constants.ROUNDING_DIGITS);
  },

  calculateArmor: function (stats, character) {
    var baseArmor = stats.armor;
    if ( character.armor ) {
      baseArmor += character.armor.protection;
    }

    return math.round(
      baseArmor * (1 + ( (stats.stamina - 10)/10 )/100 )
      , sails.config.constants.ROUNDING_DIGITS);
  },

  getStatsFromSkills: function (character) {
    var stats = {}, initial, cumulative;
    character.skills.forEach(function (skill) {
      if ( skill.details.action.type === 'stat' ) {
        stats[skill.details.action.target] = stats[skill.details.action.target] || 0;
        initial = skill.details.action.value || 0;
        cumulative = (skill.details.action.perLevel && skill.details.action.perLevel.value) ? skill.details.action.perLevel.value * skill.level : 0;
        stats[skill.details.action.target] += initial + cumulative;
      }
    });

    return stats;
  },
  getStatsFromItems: function (character) {
    var stats = {};

    sails.config.constants.ITEM_SLOTS.forEach(function (slot) {
      if ( character[slot] && character[slot].modifiers ) {
        character[slot].modifiers.forEach(function (modifier) {
          if ( modifier.type === 'stat' ) {
            stats[modifier.target] = stats[modifier.target] || 0;
            stats[modifier.target] += modifier.value;
          }
        });
      }
    }, this);
    return stats;
  }
};