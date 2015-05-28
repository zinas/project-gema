var Promise = require('bluebird');

function Fight(char1, char2) {
  this.char1 = {
    character: char1,
    skills: []
  };
  this.char2 = {
    character: char2,
    skills: []
  };
  this.log = new CombatLog();
  this.round = 1;
}

Fight.prototype.resolve = function () {
    return Promise.all([
      Skill.find({profession: this.char1.character.profession}),
      Skill.find({profession: this.char2.character.profession})
    ]).spread( (function (skills1, skills2) {
      this.char1.skills = skills1;
      this.char2.skills = skills2;

      while (
        this.char1.character.currentHP > 0 &&
        this.char2.character.currentHP > 0 &&
        this.round <= sails.config.constants.COMBAT.MAX_ROUNDS
      ) {
        this.log.roundStart(this.round);
        this.executeRound();
        this.round++;
      }
      if ( this.char1.character.currentHP <= 0 ) {
        this.log.result(this.char2.character, this.char1.character);
      } else {
        this.log.result(this.char1.character, this.char2.character);
      }

    }).bind(this), function () {
      console.log('error2');
    } );
};

Fight.prototype.executeRound = function () {
  var
    initRoll = Dice.roll(100),
    toHit, damageRoll;

  this.log.summary(this.char1.character, this.char2.character);

  if ( initRoll <= 50 ) {
    this.log.init(this.char1.character);
    this.attack(this.char1, this.char2);
    if ( this.char2.character.currentHP > 0 ) {
      this.attack(this.char2, this.char1);
    }
  } else {
    this.log.init(this.char2.character);
    this.attack(this.char2, this.char1);
    if ( this.char1.character.currentHP > 0 ) {
      this.attack(this.char1, this.char2);
    }
  }
};

Fight.prototype.attack = function (attackerChar, defenderChar) {
  var
    attacker = attackerChar.character,
    defender = defenderChar.character,
    toHit = Dice.roll(100) + attacker.attack() - defender.defence(),
    damageRoll;

  if ( toHit < attacker.hitThreshold() ) {
    // miss
    this.log.miss(attacker, defender, toHit);
  } else if ( toHit <= attacker.grazeThreshold() ) {
    // Graze
    this.log.graze(attacker, defender, toHit);
    damageRoll = attacker.grazeDamage();
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else if ( toHit < attacker.critThreshold() ) {
    // Hit
    this.log.hit(attacker, defender, toHit);
    damageRoll = attacker.hitDamage();
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else {
    // Crit
    this.log.crit(attacker, defender, toHit);
    damageRoll = attacker.critDamage();
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  }

  this.triggerSkills(attackerChar, defenderChar);
};

Fight.prototype.triggerSkills = function (attackerChar, defenderChar) {
  var characterSkill, probability, damage;

  attackerChar.skills.forEach( (function (skill) {
    this.skill(skill, attackerChar.character, defenderChar.character);
  }).bind(this) );
};

Fight.prototype.skill = function ( skill, character, target ) {
  var characterSkill, probability;
  characterSkill = _.find(character.skills, function (s) { return s.skill === skill.id; });
  probability = characterSkill.level * skill.action.probability;
  if ( Dice.check(probability) ) {
    this.skillTypes[skill.action.target].call(this, skill, characterSkill.level, character, target);
  }
};

Fight.prototype.skillTypes = {
  damage : function (skill, level, attacker, defender) {
    var damage = Dice.roll(skill.action.dice);
    defender.currentHP -= damage;
    this.log.skill(skill, attacker, damage);
    this.log.hp(defender);
  },
  heal : function (skill, level, character) {
    var heal = Dice.roll(skill.action.dice);
    character.currentHP += heal;
    if ( character.currentHP > character.maxHP ) {
      character.currentHP = character.maxHP;
    }
    this.log.skill(skill, character, heal);
    this.log.hp(character);
  },
  drain: function (skill, level, attacker, defender) {
    var damage = Dice.roll(skill.action.dice);
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

Fight.prototype.defenceSkills = function (character) {

};



module.exports = Fight;