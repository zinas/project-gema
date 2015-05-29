/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	generate: function (req, res) {
    this.levels();
    this.users();
    this.skills();

    this.weapons();
    this.armors();
    this.gadgets();
    this.implants();

    return res.json({});
  },

  levels: function () {
    Level.create({
      uuid: 'new-york',
      name: 'New York',
      description: 'Streets of New York',
      width: 2,
      height: 2
    }).exec(function (error, level) {
      Area.create({x:1, y:1, level:level.id}).exec(function () {});
      Area.create({x:1, y:2, level:level.id}).exec(function () {});
      Area.create({x:2, y:1, level:level.id}).exec(function () {});
      Area.create({x:2, y:2, level:level.id}).exec(function () {});
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
      uuid: 'minor-patch',
      name: 'Minor patch',
      profession: 'med',
      action: {
        type: 'active',
        target: 'heal',
        probability: 1,
        dice: 4
      }
    }).exec(function () {});

    Skill.create({
      uuid: 'minor-drain',
      name: 'Minor drain',
      profession: 'fix',
      action: {
        type: 'active',
        target: 'drain',
        probability: 1,
        dice: 2
      }
    }).exec(function () {});

    Skill.create({
      uuid: 'lucky-shot',
      name: 'Lucky shot',
      profession: 'sol',
      action: {
        type: 'active',
        target: 'damage',
        probability: 1,
        dice: 4
      }
    }).exec(function () {});
  },

  weapons: function () {
    Weapon.create({
      name: 'Glock 30',
      damage: 8,
      modifiers: [
        { type: 'toHit', value: 5}
      ]
    }).exec(function () {});

    Weapon.create({
      name: 'FMK-3',
      damage: 10,
      modifiers: [
        { type: 'combat', target:'toHit', value: -5},
        { type: 'combat', target:'crit', val: 3}
      ]
    }).exec(function () {});

    Weapon.create({
      name: 'Benelli M3 Super 90',
      damage: 4,
      modifiers: [
        { type: 'combat', target:'damage', value: 6}
      ]
    }).exec(function () {});
  },

  armors: function () {
    Armor.create({
      name: 'Bulletproof vest',
      protection: 3
    }).exec(function () {});
  },

  gadgets: function () {
    Gadget.create({
      name: 'Night vision goggles',
      modifiers: [
        { type: 'stat', target: 'aim', value: 5}
      ],
    }).exec(function () {});
  },

  implants: function () {
    Implant.create({
      name: 'Reflex module',
      slot: 'head',
      modifiers: [
        { type: 'stat', target: 'speed', value: 5}
      ],
    }).exec(function () {});

    Implant.create({
      name: 'Heart pump',
      slot: 'heart',
      modifiers: [
        { type: 'round', target: 'hp', value: 5}
      ],
    }).exec(function () {});
  }
};

