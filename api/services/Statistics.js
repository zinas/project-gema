module.exports = {
  generate: function (character) {
    var stats = {
      aim: character.aim,
      speed: character.speed,
      stamina: character.stamina,

      maxHP: 0,

      attack: 0,
      defence: 0,
      armor: 0,

      hitThreshold: sails.config.constants.STATS.TO_HIT,
      baseDamage: sails.config.constants.STATS.BASE_DAMAGE,

      grazeThreshold: sails.config.constants.STATS.BASE_GRAZE,
      grazeMult: sails.config.constants.STATS.GRAZE_MULTIPLIER,

      critThreshold: sails.config.constants.STATS.BASE_CRIT,
      critMult: sails.config.constants.STATS.CRIT_MULTIPLIER
    }, tmp;

    tmp = this.getStatsFromItems(character);

    stats.aim = tmp.aim;
    stats.speed = tmp.speed;
    stats.stamina = tmp.stamina;
    stats.armor = tmp.armor;
    stats.baseDamage = tmp.baseDamage;

    // stats.attack = this.calculateAttack();
    return stats;
  },

  getStatsFromItems: function (character) {
    var stats = {
      aim: 0,
      speed: 0,
      stamina: 0,
      baseDamage: sails.config.constants.STATS.BASE_DAMAGE,
      armor: 0
    };

    if ( character.weapon ) {
      stats.baseDamage = character.weapon.damage;
    }

    if ( character.armor ) {
      stats.armor = character.armor.protection;
    }

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