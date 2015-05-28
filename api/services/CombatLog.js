function Log() {
  this.log = [];
};

Log.prototype.summary = function (char1, char2) {
  this.log.push(`${char1.name} (Lvl.${char1.level}): <strong>${char1.currentHP}/${char1.maxHP}</strong> hit points. `);
  this.log.push(`${char2.name} (Lvl.${char2.level}): <strong>${char2.currentHP}/${char2.maxHP}</strong> hit points. `);
}

Log.prototype.init = function (character) {
  this.log.push(`${character.name} has won initiative and will go first.`);
}

Log.prototype.hit = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and <span class="hit">hits</span>.`);
};

Log.prototype.crit = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and <span class="crit">CRITS</span>!`);
};

Log.prototype.graze = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and <span class="graze">GRAZES</span>!`);
};

Log.prototype.miss = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} rolls ${roll} and misses.`);
};

Log.prototype.damage = function (attacker, defender, roll) {
  this.log.push(`${attacker.name} damages ${defender.name} for <strong>${roll}</strong> damage.`);
  this.hp(defender);
};

Log.prototype.hp = function (character) {
  this.log.push(`${character.name} now has ${character.currentHP} hit points left.`);
};

Log.prototype.result = function (winner, looser) {
  this.log.push(`<span class="sep">============ Result ============</span>`);
  this.log.push(`${looser.name} is dead.`);
  this.log.push(`${winner.name} wins the duel with ${winner.currentHP} hit points left.`);
};

Log.prototype.skill = function (skill, attacker, val) {
  this.log.push(`${attacker.name} triggers <span class="skill">${skill.name}</span> for ${val} ${skill.action.target}`);
}

Log.prototype.print = function () {
  this.log.forEach(function (l) {
    console.log(l);
  });
};

Log.prototype.roundStart = function (round) {
  this.log.push(`<span class="sep">============ Round ${round} ============</span>`);
};

module.exports = Log;