var math = require('mathjs');

module.exports = {
  roll: function (max) {
    max = max || 100;
    return math
      .round(math.random(1, max), sails.config.constants.ROUNDING_DIGITS);
  },

  check: function (p) {
    return this.roll(100) <= p;
  }
};