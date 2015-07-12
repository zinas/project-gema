module.exports = function () {
  ImplantTemplate.create({
    name: 'Eye implant',
    description: 'Your left eye is replaced with a micro camera '+
    'allowing you to aim better.',
    value: 1000,
    level: 10,
    modifiers: [
      { type: 'stat', target: 'aim', value: 1 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Poisoned blood',
    description: 'Parasytic nanites run through your blood. Whenever you enemy comes in contact with your blood '+
    'those nanites transfer some of his essense to you.',
    value: 3000,
    level: 3,
    modifiers: [
      { type: 'combat', target: 'drain', value: 2, probability: 50 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Metal patches',
    description: 'After very painful surgery, adamantine plates have replaced parts of your skin tissue, '+
    'giving you extra armor.',
    value: 5000,
    level: 5,
    modifiers: [
      { type: 'stat', target: 'armor', value: 5 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Mounted SMG',
    description: 'A small SMG is mounted on your back and connected directly with your brain. Operating '+
    'it takes a lot of effort, so you can use it constantly.',
    value: 7000,
    level: 7,
    modifiers: [
      { type: 'combat', target: 'damage', value: 10, probability: 20 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Reflex module',
    description: 'Small microchip connected directly to the nerve '+
    'system that allows you to move and react faster.',
    value: 9000,
    level: 9,
    modifiers: [
      { type: 'stat', target: 'speed', value: 10 }
    ],
  }).exec(function () {});

  ImplantTemplate.create({
    name: 'Heart pump',
    description: 'A motor that fuels the heart and makes it '+
    'operate at maximum capacity, allowing your blood to flow '+
    'faster and heal your wounds over time.',
    value: 10000,
    level: 10,
    modifiers: [
      { type: 'combat', target: 'heal', value: 10, probability: 100 }
    ],
  }).exec(function () {});
}