module.exports = function () {
  Profession.create({
    name: 'Fixer',
    shorthand: 'fix',
    hp: 10,
    attack: 10,
    defence: 6,
    description:
      'Fixers are the ultimate killing maching in the grid. With '+
      'vast amount of offencive choices and little defence, the hit '+
      'hard and hope to kill before being killed.'
  }).exec(function (err, model) {
    Skill.create({
      uuid: 'minor-drain',
      name: 'Minor drain',
      profession: model.id,
      action: { type: 'combat', target: 'drain', probability: 1, value: 2 }
    }).exec(function () {});
  });

  Profession.create({
    name: 'Soldier',
    shorthand: 'sol',
    hp: 10,
    attack: 8,
    defence: 8,
    description: 'Soldiers are balanced fighters. Their tactical '+
    'knowledge allows them to have equally good offensive and '+
    'defencive choices, while exceling at neither.'
  }).exec(function (err, model) {
    Skill.create({
      uuid: 'lucky-shot',
      name: 'Lucky shot',
      profession: model.id,
      action: { type: 'combat', target: 'damage', probability: 1, value: 4 }
    }).exec(function () {});
  });

  Profession.create({
    name: 'Medic',
    shorthand: 'med',
    hp: 10,
    attack: 6,
    defence: 10,
    description: 'Medics excel at survivalability. Even though they don\'t '+
    'pack a very strong punch, they know how to last long enough, until '+
    'the opponent is worn down and then they deliver the final hit.'
  }).exec(function (err, model) {
    Skill.create({
      uuid: 'minor-patch',
      name: 'Minor patch',
      profession: model.id,
      action: { type: 'combat', target: 'heal', probability: 1, value: 4 }
    }).exec(function () {});
  });
};