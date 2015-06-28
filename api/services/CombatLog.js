function Log() {
  this.log = [];
};

Log.prototype.summary = function (char1, char2) {}

Log.prototype.init = function (character) {
  this.log.push({
    what: 'initiative',
    actor: character
  });
}

Log.prototype.hit = function (attacker, defender, roll) {
  this.log.push({
    what: 'hit',
    actor: attacker,
    victim: defender,
    value: roll
  });
};

Log.prototype.crit = function (attacker, defender, roll) {
  this.log.push({
    what: 'crit',
    actor: attacker,
    victim: defender,
    value: roll
  });
};

Log.prototype.graze = function (attacker, defender, roll) {
  this.log.push({
    what: 'graze',
    actor: attacker,
    victim: defender,
    value: roll
  });
};

Log.prototype.miss = function (attacker, defender, roll) {
  this.log.push({
    what: 'miss',
    actor: attacker,
    victim: defender,
    value: roll
  });
};

Log.prototype.damage = function (attacker, defender, roll, hpleft) {
  this.log.push({
    what: 'damage',
    actor: attacker,
    victim: defender,
    value: roll,
    secondaryValue: hpleft
  });
};

Log.prototype.hp = function (character) {};

Log.prototype.result = function (winner, looser) {
  this.log.push({
    what: 'result',
    winner: winner,
    looser: looser
  });
};

Log.prototype.skill = function (skill, attacker, val) {
  this.log.push({
    what: 'skill',
    actor: attacker,
    which: skill,
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