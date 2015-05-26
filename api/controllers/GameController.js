var Promise = require('bluebird');

/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  fight: function (req, res) {

    Promise.all([
      Character.findOne({name: 'Nikos'}),
      Character.findOne({name: 'Efi'})
    ]).spread(function (att, def) {
      var fight = new Fight(att, def);
      fight.resolve();
      return res.view({att:att, def:def, log: fight.log.log});
    });
  },

  createCharacter: function (req, res) {
    return res.view();
  },

  levelup: function (req, res) {
    return res.view();
  }
};

