module.exports = function () {
  WeaponTemplate.create({
    name: 'Glock 30',
    description: 'Typical pistol, widely available in the market.',
    value: 1000,
    level: 1,
    damage: 6,
    modifiers: [
      { type: 'stat', target:'attack', value: 5 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Glock 30++',
    description: 'Typical pistol, widely available in the market.',
    value: 2000,
    level: 2,
    damage: 6,
    modifiers: [
      { type: 'stat', target:'attack', value: 5 },
      { type: 'stat', target:'damage', value: 1 },
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'FMK-3',
    description: 'Submachine gun with low accuracy, but extra critical damage.',
    value: 3000,
    level: 3,
    damage: 10,
    modifiers: [
      { type: 'stat', target:'attack', value: -10 },
      { type: 'stat', target:'critMult', value: 0.3 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'FMK-3++',
    description: 'Submachine gun with low accuracy, but extra critical damage.',
    value: 4000,
    level: 4,
    damage: 10,
    modifiers: [
      { type: 'stat', target:'attack', value: -5 },
      { type: 'stat', target:'critMult', value: 0.5 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Benelli M3 Super 90',
    description: 'A very powerful shotgun that delivers extra damage.',
    value: 5000,
    level: 5,
    damage: 6,
    modifiers: [
      { type: 'stat', target:'damage', value: 6 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Benelli M3 Super 90++',
    description: 'A very powerful shotgun that delivers extra damage.',
    value: 6000,
    level: 6,
    damage: 6,
    modifiers: [
      { type: 'stat', target:'damage', value: 10 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Desert Eagle',
    description: 'The best pistol around.',
    value: 8000,
    level: 8,
    damage: 12,
    modifiers: [
      { type: 'stat', target:'aim', value: 3 }
    ]
  }).exec(function () {});

  WeaponTemplate.create({
    name: 'Desert Eagle++',
    description: 'The best pistol around.',
    value: 10000,
    level: 10,
    damage: 12,
    modifiers: [
      { type: 'combat', target: 'drain', value: 6, probability: 100 }
    ]
  }).exec(function () {});
}