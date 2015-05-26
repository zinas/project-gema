function Log() {
  this.log = [];
};

Log.prototype.init = function (character) {
  this.log.push(`${character.name} has won initiative and will go first.`);
}

Log.prototype.hit = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and hits.`);
};

Log.prototype.crit = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and CRITS!`);
};

Log.prototype.graze = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and GRAZES!`);
};

Log.prototype.miss = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and misses.`);
};

Log.prototype.damage = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} damages ${defender.name} for ${roll} damage.`);
};

Log.prototype.result = function (winner, looser) {
  this.log.push('\n\n');
  this.log.push(`============ Result ============`);
  this.log.push(`${looser.name} is dead.`);
  this.log.push(`${winner.name} wins the duel`);
};

Log.prototype.print = function () {
  this.log.forEach(function (l) {
    console.log(l);
  });
};

Log.prototype.roundStart = function (round) {
  this.log.push('\n\n');
  this.log.push(`============ Round ${round} ============`);
};

module.exports = Log;