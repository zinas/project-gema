var Promise = require('bluebird');

/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  fight: function (req, res) {

    Character.find().exec(function (error, characters) {
      var
        att = characters[0],
        def = characters[1],
        fight = new Fight(att, def);
      fight.resolve().then(function () {
        return res.view({att:att, def:def, log: fight.log.log});
      }, function (error) {
        console.log('error', error);
      });
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
  }
};

