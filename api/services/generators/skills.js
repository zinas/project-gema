module.exports = function () {
  Skill.create({
    uuid: 'accuracy',
    name: 'Accuracy',
    profession: 'all',
    action: { type: 'stat', target: 'aim', value: 1 }
  }).exec(function () {});

  Skill.create({
    uuid: 'alacrity',
    name: 'Alacrity',
    profession: 'all',
    action: { type: 'stat', target: 'speed', value: 1 }
  }).exec(function () {});

  Skill.create({
    uuid: 'durability',
    name: 'Durability',
    profession: 'all',
    action: { type: 'stat', target: 'stamina', value: 1 }
  }).exec(function () {});
}