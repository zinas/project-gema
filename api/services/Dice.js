module.exports = {
  roll: function (sides) {
    sides = sides || 100;
    return Math.floor(Math.random() * sides) + 1;
  },

  check: function (p) {
    return this.roll(100) <= p;
  }
};