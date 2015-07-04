var
  Promise = require('bluebird'),
  math = require('mathjs');

/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  fight: function (req, res) {
    var char1 = res.locals.character;
    var target = req.param('target');
    var id = req.param('id');
    var targets = {
      monster: Monster,
      character: Character
    };

    targets[target].findOnePopulated({id: id}).then(function (char2) {
      char1.stats = Statistics.generate(char1);
      char2.stats = Statistics.generate(char2);
      var fight = new Fight(char1, char2);
      fight.resolve();

      if ( target === 'monster' && fight.winner === 'attacker' ) {
        Reward.roll(char2.level).then(function (item) {
          return res.json({
            attacker:char1,
            defender:char2,
            log: fight.log.log,
            result: {
              winner: fight.winner,
              xp: fight.xp,
              dollars: fight.dollars,
              item: item
            }
          });

        });
      } else {
        return res.json({
          attacker:char1,
          defender:char2,
          log: fight.log.log,
          result: {
            winner: fight.winner,
            xp: fight.xp,
            dollars: fight.dollars
          }
        });
      }
    });
  },

  createCharacter: function (req, res) {
    return res.view({
      frameTitle: 'Create your character',
      isJsx: true
    });
  },

  character: function (req, res) {
    return res.view({
      frameTitle: 'Vital signs',
      isJsx: true
    });
  },

  inventory: function (req, res) {
    return res.view();
  },

  map: function (req, res) {
    return res.view({frameTitle: 'Map'});
  },

  test: function (req, res) {
    Character
      .findOnePopulated({name: 'Warrior'})
      .then(function (character) {
        character.stats = Statistics.generate(character);
        res.json(character);
      });
  },

  explore: function (req, res) {
    return res.view({
      frameTitle: 'Explore',
      isJsx: true
    });
  },

  heal: function (req, res) {
    Character.update({id: res.locals.character.id}, {
      currentHP: res.locals.character.maxHP
    }).exec(function (err) {
      console.log(err);
    });

    return res.json({});
  }
};

