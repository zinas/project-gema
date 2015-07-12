var math = require('mathjs');

module.exports = {
  roll: function (max) {
    max = max || 100;
    return math
      .round(math.random(1, max), sails.config.constants.ROUNDING_DIGITS);
  },

  random: function (max, min) {
    max = max || 100;
    min = min || 1;
    return math.randomInt(min, max);
  },

  check: function (p) {
    return this.random() <= p;
  }
};