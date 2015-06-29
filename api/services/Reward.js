var math = require('mathjs');

var XP_PER_LEVEL = 8;
var DOLLARS_PER_LEVEL = 15;

module.exports = {
  xp: function (playerLevel, opponentLevel, isWin, isPlayer, multiplier) {
    multiplier = multiplier || 1;
    var reward = opponentLevel * XP_PER_LEVEL;

    var diff = opponentLevel - playerLevel;
    if ( diff < -5 ) { diff = -5; }
    if ( diff > 5 ) { diff = 5; }

    reward = reward * ( 1 + diff / 20 );

    if ( isPlayer ) {
      reward = reward * 1.1;
    }

    if ( !isWin ) {
      reward = reward * 0.1;
    }

    reward = reward * multiplier;
    reward = math.random(0.9 * reward, 1.1 * reward);

    console.log('xp', reward);

    return math.round(reward);
  },

  dollars: function (playerLevel, opponentLevel, isWin, isPlayer, multiplier) {
    multiplier = multiplier || 1;
    var reward = opponentLevel * DOLLARS_PER_LEVEL;

    var diff = opponentLevel - playerLevel;
    if ( diff < -3 ) { diff = -3; }
    if ( diff > 3 ) { diff = 3; }

    reward = reward * ( 1 + diff / 20 );

    if ( isPlayer ) {
      reward = reward * 1.2;
    }

    if ( !isWin ) {
      reward = reward * 0.2;
    }

    reward = reward * multiplier;
    reward = math.random(0.8 * reward, 1.2 * reward);

    console.log('dollars', reward);
    return math.round(reward);
  }
};