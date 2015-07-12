/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  test: function (req, res) {
    Monster.clearStale().then(function (monsters) {
      res.json({len: monsters.length});
    })
  },

	all: function (req, res) {
    Generate('professions');
    Generate('levels');
    Generate('skills');
    Generate('monsters');

    Generate('weapons');
    Generate('armors');
    Generate('implants');

    return res.json({});
  },

  monsterTemplates: function (req, res) {
    Generate('monsters');
    return res.json({});
  },

  levels: function (req, res) {
    Generate('levels');
    return res.json({});
  },

  skills: function (req, res) {
    Generate('skills');
    return res.json({});
  },

  weapons: function (req, res) {
    Generate('weapons');
    return res.json({});
  },

  armors: function (req, res) {
    Generate('armors');
    return res.json({});
  },

  implants: function (req, res) {
    Generate('armors');
    return res.json({});
  }
};

