function Log() {
  this.log = [];
};

Log.prototype.summary = function (char1, char2) {}

Log.prototype.init = function (character) {
  this.log.push({
    what: 'initiative',
    actor: character.name
  });
}

Log.prototype.hit = function (attacker, defender, roll, damage, hpLeft) {
  this.log.push({
    what: 'hit',
    actor: attacker.name,
    victim: defender.name,
    roll: roll,
    damage: damage,
    hpLeft: hpLeft
  });
};

Log.prototype.crit = function (attacker, defender, roll, damage, hpLeft) {
  this.log.push({
    what: 'crit',
    actor: attacker.name,
    victim: defender.name,
    roll: roll,
    damage: damage,
    hpLeft: hpLeft
  });
};

Log.prototype.graze = function (attacker, defender, roll, damage, hpLeft) {
  this.log.push({
    what: 'graze',
    actor: attacker.name,
    victim: defender.name,
    roll: roll,
    damage: damage,
    hpLeft: hpLeft
  });
};

Log.prototype.miss = function (attacker, defender, roll) {
  this.log.push({
    what: 'miss',
    actor: attacker.name,
    victim: defender.name,
    value: roll
  });
};

Log.prototype.damage = function (attacker, defender, roll, hpleft) {};
Log.prototype.hp = function (character) {};

Log.prototype.result = function (winner, looser) {
  this.log.push({
    what: 'result',
    winner: winner.name,
    looser: looser.name
  });
};

Log.prototype.skill = function (skill, attacker, val) {
  this.log.push({
    what: 'skill',
    actor: attacker.name,
    which: skill.name,
    value: val
  });
}

Log.prototype.print = function () {
  this.log.forEach(function (l) {
    console.log(l);
  });
};

Log.prototype.roundStart = function (round) {
  this.log.push({
    what: 'round',
    value: round
  });
};

module.exports = Log;