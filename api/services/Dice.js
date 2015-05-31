var math = require('mathjs');

module.exports = {
  roll: function (max) {
    max = max || 100;
    return math.round(math.random([1, max]), 4);
  },

  check: function (p) {
    return this.roll(100) <= p;
  }
};