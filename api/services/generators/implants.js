module.exports = function () {
  Implant.create({
    name: 'Reflex module',
    modifiers: [
      { type: 'stat', target: 'speed', value: 5 }
    ],
  }).exec(function () {});

  Implant.create({
    name: 'Heart pump',
    modifiers: [
      { type: 'combat', target: 'heal', value: 5, probability: 100 }
    ],
  }).exec(function () {});
}