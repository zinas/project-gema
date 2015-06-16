/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	generate: function (req, res) {
    this.professions();

    this.levels();
    this.users();
    this.skills();

    this.weapons();
    this.armors();
    this.implants();

    return res.json({});
  },

  professions: function () {
    Profession.create({
      name: 'Fixer',
      shorthand: 'fix',
      hp: 10,
      attack: 10,
      defence: 6,
      description: 'Fixers are the ultimate killing maching in the grid. With vast amount of offencive choices and little defence, the hit hard and hope to kill before being killed'
    }).exec(function (err, model) {
      console.log('--->', model, err);
      Skill.create({
        uuid: 'minor-drain',
        name: 'Minor drain',
        profession: model.id,
        action: { type: 'combat', target: 'drain', probability: 1, dice: 2 }
      }).exec(function () {});
    });

    Profession.create({
      name: 'Soldier',
      shorthand: 'sol',
      hp: 10,
      attack: 8,
      defence: 8,
      description: 'Soldiers are balanced fighters. Their tactical knowledge allows them to have equally good offensive and defencive choices, while exceling at neither'
    }).exec(function (err, model) {
      Skill.create({
        uuid: 'lucky-shot',
        name: 'Lucky shot',
        profession: model.id,
        action: { type: 'combat', target: 'damage', probability: 1, dice: 4 }
      }).exec(function () {});
    });

    Profession.create({
      name: 'Medic',
      shorthand: 'med',
      hp: 10,
      attack: 6,
      defence: 10,
      description: 'Medics excel at survivalability. Even though they don\'t pack a very strong punch, they know how to last long enough, until the opponent is worn down and then they deliver the final hit.'
    }).exec(function (err, model) {
      Skill.create({
        uuid: 'minor-patch',
        name: 'Minor patch',
        profession: model.id,
        action: { type: 'combat', target: 'heal', probability: 1, dice: 4 }
      }).exec(function () {});
    });
  },

  levels: function () {
    Level.create({
      uuid: 'new-york',
      name: 'New York',
      description: 'Streets of New York',
      rank: 1,
      maxLevelAllowed: 10,
      width: 2,
      height: 2
    }).exec(function (error, level) {
      console.log(error);
      Area.create({x:1, y:1, level:level.id}).exec(function () {});
      Area.create({x:1, y:2, level:level.id}).exec(function () {});
      Area.create({x:1, y:3, level:level.id}).exec(function () {});
      Area.create({x:2, y:1, level:level.id}).exec(function () {});
      Area.create({x:2, y:2, level:level.id}).exec(function () {});
      Area.create({x:2, y:3, level:level.id}).exec(function () {});
      Area.create({x:3, y:1, level:level.id}).exec(function () {});
      Area.create({x:3, y:2, level:level.id}).exec(function () {});
      Area.create({x:3, y:3, level:level.id}).exec(function () {});
    });

  },

  users: function () {
    User.create({
      name: 'Nikos Zinas',
      email: 'zinas.nikos@gmail.com',
      password: '123'
    }).exec(function (error, user) {});
  },

  skills: function () {

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
  },

  weapons: function () {
    Weapon.create({
      name: 'Glock 30',
      damage: 8,
      modifiers: [
        { type: 'stat', target:'attack', value: 5 }
      ]
    }).exec(function () {});

    Weapon.create({
      name: 'FMK-3',
      damage: 10,
      modifiers: [
        { type: 'stat', target:'attack', value: -5 },
        { type: 'stat', target:'critMult', value: 0.3 }
      ]
    }).exec(function () {});

    Weapon.create({
      name: 'Benelli M3 Super 90',
      damage: 4,
      modifiers: [
        { type: 'stat', target:'damage', value: 6 }
      ]
    }).exec(function () {});
  },

  armors: function () {
    Armor.create({
      name: 'Bulletproof vest',
      protection: 3
    }).exec(function () {});
  },

  implants: function () {
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
};

