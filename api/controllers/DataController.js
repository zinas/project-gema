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
      console.log('error', error);
      console.log('level', level);
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
  }
};

