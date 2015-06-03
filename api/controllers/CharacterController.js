/**
 * CharacterController
 *
 * @description :: Server-side logic for managing Characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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