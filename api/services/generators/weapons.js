module.exports = function () {
  WeaponTemplate.create({
    name: 'Glock 30',
    description: 'Typical pistol, widely available in the market.',
    value: 8000,
    level: 1,
    damage: 8,
    modifiers: [
      { type: 'stat', target:'attack', value: 5 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'FMK-3',
    description: 'Submachine gun with low accuracy, but extra critical damage.',
    value: 8000,
    level: 3,
    damage: 10,
    modifiers: [
      { type: 'stat', target:'attack', value: -5 },
      { type: 'stat', target:'critMult', value: 0.3 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Benelli M3 Super 90',
    description: 'A very powerful shotgun that delivers extra damage.',
    value: 5000,
    level: 2,
    damage: 4,
    modifiers: [
      { type: 'stat', target:'damage', value: 6 }
    ]
  }).exec(function () {});

}