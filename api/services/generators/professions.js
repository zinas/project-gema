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
      'hard and hope to kill before being killed.',
  }).exec(function (err, model) {
    Skill.create({
      uuid: 'minor-drain',
      name: 'Minor drain',
      description: 'The fixer uses nanobots infused bullets which deliver part of the opponents vitality back to him.',
      profession: model.id,
      action: { type: 'combat', target: 'drain', probability: 5, value: 5, perLevel: {probability: 1, value: 0.5} }
    }).exec(function () {});
    Skill.create({
      uuid: 'weak-spots-targetting',
      name: 'Weak spots targetting',
      description: 'The fixer is highly trained to spot weaknesses in his opponents fighting style. By targetting '+
      'those weak spots he can cause increased damage',
      profession: model.id,
      action: { type: 'stat', target: 'critMult', value: 0, perLevel: {value: 0.05} }
    }).exec(function () {});
    Skill.create({
      uuid: 'lucky-shot',
      name: 'Lucky shot',
      description: 'A fixers life depends on his luck Sometimes he just happens to land a very strong blow.',
      profession: model.id,
      action: { type: 'combat', target: 'damage', probability: 1, value: 20, perLevel: {probability: 0.2, value: 5} }
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
      uuid: 'full-auto',
      name: 'Full Auto',
      description: 'The Soldier empties his clip at the enemy managing a lot of simultaneous hits.',
      profession: model.id,
      action: { type: 'combat', target: 'damage', probability: 5, value: 5, perLevel: {probability: 1, value: 0.5} }
    }).exec(function () {});

    Skill.create({
      uuid: 'basic-training',
      name: 'Basic Training',
      description: 'Military training has made the Soldier resilient. He can take a punch. Or two.',
      profession: model.id,
      action: { type: 'stat', target: 'armor', value: 1, perLevel: {value: 0.3} }
    }).exec(function () {});

    Skill.create({
      uuid: 'personal-medpac',
      name: 'Personal Medpac',
      description: 'The Soldier carries around his personal life saver. A small medpac which injects nanites in his blood, '+
      'allowing him to regenerate his wound constantly.',
      profession: model.id,
      action: { type: 'combat', target: 'heal', probability: 75, value: 1, perLevel: {value: 0.25} }
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
      description: 'The Medic has invented a special mix of medication that immediately close some of his wounds. '+
      'As he gets more experienced, this mixture gets more and more potent',
      profession: model.id,
      action: { type: 'combat', target: 'heal', probability: 5, value: 5, perLevel: {probability: 1, value: 0.5} }
    }).exec(function () {});

    Skill.create({
      uuid: 'poison',
      name: 'Poison',
      description: 'The Medic sends nanobots towards his enemy which infliltrate his skin and start to rot him from the inside.'+
      'Slowly but steadily they shut down his organism.',
      profession: model.id,
      action: { type: 'combat', target: 'damage', probability: 90, value: 1, perLevel: {value: 0.1} }
    }).exec(function () {});

    Skill.create({
      uuid: 'drug-exposure',
      name: 'Drug exposure',
      description: 'The Medic knows how to create a variety of drugs and medicine. And he has tried them all '+
      'on himself. His immune system exhbits great resilience after having tried all sorts of drugs',
      profession: model.id,
      action: { type: 'stat', target: 'stamina', value: 1, perLevel: {value: 1.25} }
    }).exec(function () {});
  });
};