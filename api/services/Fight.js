function Fight(char1, char2) {
  this.char1 = char1;
  this.char2 = char2;
  this.log = new CombatLog();
  this.round = 1;
}

Fight.prototype.resolve = function () {
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
    this.log.result(this.char2, this.char1);
  } else {
    this.log.result(this.char1, this.char2);
  }
};

Fight.prototype.executeRound = function () {
  var
    initRoll = Dice.roll(100),
    toHit, damageRoll;
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
    toHit = Dice.roll(100) + attacker.attack() - defender.defence(),
    damageRoll = Dice.roll(10);

    console.log('a', attacker.attack());

  if ( toHit < attacker.hit() ) {
    // miss
    this.log.miss(attacker, defender, toHit);
  } else if ( toHit <= attacker.graze() ) {
    // Graze
    this.log.graze(attacker, defender, toHit);
    damageRoll = Math.round(damageRoll * attacker.grazeMult());
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else if ( toHit < attacker.crit() ) {
    // Hit
    this.log.hit(attacker, defender, toHit);
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  } else {
    // Crit
    this.log.crit(attacker, defender, toHit);
    damageRoll = Math.round(damageRoll * attacker.critMult());
    defender.currentHP = defender.currentHP - damageRoll;
    this.log.damage(attacker, defender, damageRoll);
  }
};


module.exports = Fight;