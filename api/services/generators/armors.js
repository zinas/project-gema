module.exports = function () {
  ArmorTemplate.create({
    name: 'Leather vest',
    description: 'A leather vest created to deflect and withstand attacks from sharp objects.',
    value: 1000,
    level: 1,
    protection: 1
  }).exec(function () {});

  ArmorTemplate.create({
    name: 'Computer assisted boots',
    description: 'These boots get input directly from your HUD, offering minor adjustments to your reflexes and reaction in real time.',
    value: 3000,
    level: 3,
    protection: 1,
    modifiers: [{ type: 'stat', target: 'speed', value: 1 }]
  }).exec(function () {});

  ArmorTemplate.create({
    name: 'Bulletproof vest',
    description: 'A vest that used to be used by police when raiding dangerous premises.',
    value: 5000,
    level: 5,
    protection: 5,
  }).exec(function () {});

  ArmorTemplate.create({
    name: 'Mechanical arm',
    description: 'A specially crafted metal alloy wraps the whole arm, creating something that looks like a mechanical arm. This increased both mobility and resilience',
    value: 7000,
    level: 7,
    protection: 5,
    modifiers: [
      { type: 'stat', target: 'stamina', value: 2 },
      { type: 'stat', target: 'speed', value: 2 }
    ]
  }).exec(function () {});

  ArmorTemplate.create({
    name: 'Advanced targetting system',
    description: 'Helmet with a targetting module attached on it. The wearer gets adequate protection, plus the ability to target enemies at greater distance.',
    value: 8000,
    level: 8,
    protection: 5,
    modifiers: [{ type: 'stat', target: 'aim', value: 5 }]
  }).exec(function () {});
}