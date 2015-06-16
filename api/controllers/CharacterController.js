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

  move: function (req, res) {
    Character.move({
      id: req.param('id')
    }, req.param('coords'))
    .then(function (character) {
      console.log('sending back character', character);
      res.json(character);
    });
  }
};