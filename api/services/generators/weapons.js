module.exports = function () {
  Weapon.create({
    name: 'Glock 30',
    damage: 8,
    modifiers: [
      { type: 'stat', target:'attack', value: 5 }
    ]
  }).exec(function () {});

  Weapon.create({
    name: 'FMK-3',
    damage: 10,
    modifiers: [
      { type: 'stat', target:'attack', value: -5 },
      { type: 'stat', target:'critMult', value: 0.3 }
    ]
  }).exec(function () {});

  Weapon.create({
    name: 'Benelli M3 Super 90',
    damage: 4,
    modifiers: [
      { type: 'stat', target:'damage', value: 6 }
    ]
  }).exec(function () {});

}