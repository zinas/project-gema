/**
 * AreaController
 *
 * @description :: Server-side logic for managing Areas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  findLevelAreas: function (req, res) {
    Area.find({level: req.param('level')}).then(function (areas) {
      res.json(areas);
    }, function (error) {
      res.json({error:error});
    });
  }
};

