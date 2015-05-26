module.exports = {
  roll: function (sides) {
    sides = sides || 100;
    return Math.floor(Math.random() * sides) + 1;
  }
};