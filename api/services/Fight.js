var Promise = require('bluebird');
var math = require('mathjs');

function Fight(char1, char2) {
  this.char1 = char1;
  this.char2 = char2;
  this.log = new CombatLog();
  this.round = 1;
}

Fight.prototype.resolve = function () {
  var winner, looser;
  while (
    this.char1.currentHP > 0 &&
    this.char2.currentHP > 0 &&
    this.round <= sails.config.constants.COMBAT.MAX_ROUNDS
  ) {
    this.log.roundStart(this.round);
    this.executeRound();
    this.round++;
  }

  if ( this.char1.currentHP <= 0 ) {
    winner = this.char2;
    looser = this.char1;
  } else {
    winner = this.char1;
    looser = this.char2;
  }
  this.log.result(winner, looser);
};

Fight.prototype.executeRound = function () {
  var
    initRoll = Dice.roll(100),
    toHit, damageRoll;

  this.log.summary(this.char1, this.char2);

  if ( initRoll <= 50 ) {
    this.log.init(this.char1);
    this.attack(this.char1, this.char2);
    if ( this.char2.currentHP > 0 ) {
      this.attack(this.char2, this.char1);
    }
  } else {
    this.log.init(this.char2);
    this.attack(this.char2, this.char1);
    if ( this.char1.currentHP > 0 ) {
      this.attack(this.char1, this.char2);
    }
  }
};

Fight.prototype.attack = function (attacker, defender) {
  var
    toHit = Dice.roll(100) + attacker.stats.attack - defender.stats.defence,
    damageRoll = Dice.roll(attacker.stats.damage);

  if ( toHit < attacker.stats.hitThreshold ) {
    // miss
    this.log.miss(attacker, defender, toHit);
  } else if ( toHit <= attacker.stats.grazeThreshold ) {
    // Graze
    this.log.graze(attacker, defender, toHit);
    damageRoll = damageRoll * attacker.stats.grazeMult;
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else if ( toHit < attacker.stats.critThreshold ) {
    // Hit
    this.log.hit(attacker, defender, toHit);
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else {
    // Crit
    this.log.crit(attacker, defender, toHit);
    damageRoll = damageRoll * attacker.stats.critMult;
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  }

  if ( attacker.skills ) {
    attacker.skills.forEach( (function (skill) {
      this.skill(skill, attacker, defender);
    }).bind(this) );
  }
};

Fight.prototype.skill = function ( skill, character, target ) {
  var probability = skill.level * skill.details.action.probability;
  if ( Dice.check(probability) ) {
    this.skillTypes[skill.details.action.target].call(this, skill, character, target);
  }
};

Fight.prototype.skillTypes = {
  damage : function (skill, attacker, defender) {
    var damage = Dice.roll(skill.details.action.dice);
    defender.currentHP -= damage;
    this.log.skill(skill, attacker, damage);
    this.log.hp(defender);
  },
  heal : function (skill, character) {
    var heal = Dice.roll(skill.details.action.dice);
    character.currentHP += heal;
    if ( character.currentHP > character.maxHP ) {
      character.currentHP = character.maxHP;
    }
    this.log.skill(skill, character, heal);
    this.log.hp(character);
  },
  drain: function (skill, level, attacker, defender) {
    var damage = Dice.roll(skill.details.action.dice);
    defender.currentHP -= damage;
    attacker.currentHP += damage;
    if ( attacker.currentHP > attacker.maxHP ) {
      attacker.currentHP = attacker.maxHP;
    }
    this.log.skill(skill, attacker, damage);
    this.log.hp(attacker);
    this.log.hp(defender);
  }
};

module.exports = Fight;