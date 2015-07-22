var math = require('mathjs');

var XP_PER_LEVEL = 15;
var DOLLARS_PER_LEVEL = 10;

module.exports = {
  xp: function (playerLevel, opponentLevel, isWin, isPlayer, multiplier) {
    multiplier = multiplier || 1;
    var reward = playerLevel * XP_PER_LEVEL * math.pow(0.9, playerLevel - 1);

    var diff = opponentLevel - playerLevel;
    if ( diff < -3 ) { diff = -5; }
    if ( diff > 5 ) { diff = 5; }

    var modifier = diff/18;
    if (diff < 0) { modifier = diff / 5 };

    reward = reward * ( 1 + modifier );

    if ( isPlayer ) {
      reward = reward * 1.1;
    }

    if ( !isWin ) {
      reward = reward * 0.1;
    }

    reward = reward * multiplier;
    reward = math.random(0.9 * reward, 1.1 * reward);

    return math.round(reward);
  },

  dollars: function (playerLevel, opponentLevel, isWin, isPlayer, multiplier) {
    if ( !isWin ) {
      return 0;
    }

    multiplier = multiplier || 1;
    var reward = playerLevel * DOLLARS_PER_LEVEL * math.pow(0.9, playerLevel - 1);

    var diff = opponentLevel - playerLevel;
    if ( diff < -3 ) { diff = -5; }
    if ( diff > 5 ) { diff = 5; }

    var modifier = diff/18;
    if (diff < 0) { modifier = diff / 5 };

    reward = reward * ( 1 + modifier );

    if ( isPlayer ) {
      reward = reward * 1.2;
    }

    reward = reward * multiplier;
    reward = math.random(0.8 * reward, 1.2 * reward);

    return math.round(reward);
  },

  item: function (player, opponent, multiplier) {
    multiplier = multiplier || 1;
    var baseChance = 1.5;
    var initial = Dice.roll();
    if (  initial > baseChance * multiplier ) return Promise.resolve(null);

    var items = [
      { item: Weapon, template: WeaponTemplate },
      { item: Armor, template: ArmorTemplate },
      { item: Implant, template: ImplantTemplate }
    ], rolled = math.randomInt(0, items.length);
    var minLevel = math.round(0.8 * opponent.level);
    var maxLevel = math.round(1.2 * opponent.level);

    return items[rolled].template.find({
        level: { '>=': minLevel, '<=': maxLevel }
      }).then(function (templates) {
        return templates[math.randomInt(0, templates.length)];
      }).then(function (template) {
        if ( !template ) return null;
        return items[rolled].item.createFromTemplate(template, player);
      });
  }
};