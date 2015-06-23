/**
 * CharacterController
 *
 * @description :: Server-side logic for managing Characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    Character.create({
      name: req.param('name'),
      profession: req.param('profession'),
      user: req.user.id
    }).exec(function (err, newInstance) {
      console.log('err', err);
      console.log('newInstance', newInstance);
      if (err) return res.negotiate(err);

      res.created(newInstance);
    });
  },

  levelup: function (req, res) {

  },

  move: function (req, res) {
    Character.findOne({user: req.user.id}).then(function (character) {
      Character.move({
        id: character.id
      }, req.param('coords'))
      .then(function (character) {
        res.json(character);
      });
    });
  }
};