/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	all: function (req, res) {
    Generate('professions');
    Generate('levels');
    Generate('skills');
    Generate('monsters');

    // Generate('weapons');
    // Generate('armors');
    // Generate('implants');

    return res.json({});
  },

  monsterTemplates: function () {
    Generate('monsters');
    return res.json({});
  },

  levels: function () {
    Generate('levels');
    return res.json({});
  },

  skills: function () {
    Generate('skills');
    return res.json({});
  },

  weapons: function () {
    Generate('weapons');
    return res.json({});
  },

  armors: function () {
    Generate('armors');
    return res.json({});
  },

  implants: function () {
    Generate('armors');
    return res.json({});
  }
};

