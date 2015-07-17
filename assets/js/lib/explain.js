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
      '<strong>' + modifier.probability +
      '%</strong> chance to <strong>' + abbr(modifier.target) + '</strong>' +
      ' for <strong>' + modifier.value + '</strong> points';
    if ( modifier.perLevel ) {
      str += ' initially, plus <strong>' + modifier.perLevel.probability + '%</strong> chance and <strong>' +
      modifier.perLevel.value + '</strong> ' + abbr(modifier.target) + ' per level';
    }
    return str;
  },
  stat: function (modifier) {
    var effect = modifier.value >= 0 ?
      '<span class="text-success">Increase</span>' :
      '<span class="text-danger">Decrease</span>';

    var str;

    if ( modifier.perLevel ) {
      str = effect + ' <strong>' + abbr(modifier.target) + '</strong> by <strong>' + modifier.perLevel.value + '</strong> points per level.';
    } else {
      str = effect + ' <strong>' + abbr(modifier.target) + '</strong> by <strong>' + modifier.value + '</strong>.';
    }

    return str;
  }
};

module.exports = function (modifier) {
  return types[modifier.type](modifier);
};