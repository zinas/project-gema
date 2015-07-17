module.exports = function () {
  Skill.create({
    uuid: 'accuracy',
    name: 'Accuracy',
    description: '',
    profession: 'all',
    action: { type: 'stat', target: 'aim', value: 0, perLevel: {value: 1} }
  }).exec(function () {});

  Skill.create({
    uuid: 'alacrity',
    name: 'Alacrity',
    description: '',
    profession: 'all',
    action: { type: 'stat', target: 'speed', value: 0, perLevel: {value: 1} }
  }).exec(function () {});

  Skill.create({
    uuid: 'durability',
    name: 'Durability',
    description: '',
    profession: 'all',
    action: { type: 'stat', target: 'stamina', value: 0, perLevel: {value: 1} }
  }).exec(function () {});
}