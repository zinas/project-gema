var abbreviations = {
  critMult: 'critical multiplier',
  crit: 'critical chance'
};

function abbr(str) {
  return abbreviations[str] || str;
}

var types = {
  combat: function (modifier) {
    var str =
      '<strong>' + modifier.possibility +
      '%</strong> chance to <strong>' + abbr(modifier.target) + '<strong>' +
      ' for <strong>' + modifier.value + '<strong> points.';

    return str;
  },
  stat: function (modifier) {
    var effect = modifier.value > 0 ?
      '<span class="text-success">Increase</span>' :
      '<span class="text-danger">Decrease</span>';

    return effect + ' <strong>' + abbr(modifier.target) + '</strong> by <strong>' + modifier.value + '</strong>';
  }
};

module.exports = function (modifier) {
  return types[modifier.type](modifier);
};