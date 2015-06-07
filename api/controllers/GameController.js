var Promise = require('bluebird');

/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  fight: function (req, res) {
    var
      char1 = Character.findOnePopulated({name: 'Warrior'}),
      char2 = Character.findOnePopulated({name: 'Doctor'});

    Promise
      .all([char1, char2])
      .spread(function (char1, char2) {
        char1.stats = Statistics.generate(char1);
        char2.stats = Statistics.generate(char2);
        var fight = new Fight(char1, char2);
        fight.resolve();
        return res.view({att:char1, def:char2, log: fight.log.log});
      }, function (error) {
        console.log(error);
        res.json({})
      });
  },

  createCharacter: function (req, res) {
    return res.view();
  },

  levelup: function (req, res) {
    return res.view();
  },

  inventory: function (req, res) {
    return res.view();
  },

  map: function (req, res) {
    return res.view();
  },

  test: function (req, res) {
    Character
      .findOnePopulated({name: 'Warrior'})
      .then(function (character) {
        character.stats = Statistics.generate(character);
        res.json(character);
      });
  },

  index: function (req, res) {
    return res.view();
  }
};

