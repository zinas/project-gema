module.exports = function () {
  ImplantTemplate.create({
    name: 'Reflex module',
    description: 'Small microchip connected directly to the nerve '+
    'system that allows you to move and react faster.',
    value: 20000,
    level: 10,
    modifiers: [
      { type: 'stat', target: 'speed', value: 5 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Heart pump',
    description: 'A motor that fuels the heart and makes it '+
    'operate at maximum capacity, allowing your blood to flow '+
    'faster and heal your wounds over time.',
    value: 20000,
    level: 10,
    modifiers: [
      { type: 'combat', target: 'heal', value: 5, probability: 100 }
    ],
  }).exec(function () {});
}