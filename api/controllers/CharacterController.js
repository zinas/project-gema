/**
 * CharacterController
 *
 * @description :: Server-side logic for managing Characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Promise = require('bluebird');

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

  setup: function (req, res) {
    Promise.all([
      Character.findOne({name: 'Nikos'}),
      Character.findOne({name: 'Efi'})
    ]).spread(function (char1, char2) {
      if ( req.method === 'POST' ) {
        char1.profession = req.param('char1').profession;
        char1.level = req.param('char1').level;
        char1.save();

        char2.profession = req.param('char2').profession;
        char2.level = req.param('char2').level;
        char2.save();
      }
      return res.view({char1: char1, char2: char2});
    });
  },

  create: function (req, res) {

    return res.view();
  }
};