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

      char1.currentHP = char1.currentHP > 0 ? math.round(char1.currentHP) : 0;
      char1.xp = char1.xp + fight.xp;
      char1.dollars = char1.dollars + fight.dollars;

      Character.update({id: char1.id}, {
        currentHP: char1.currentHP,
        xp: char1.xp,
        dollars: char1.dollars
      }).exec(function() {});

      if ( target === 'monster' && fight.winner === 'attacker' ) {
        Monster.destroy({id: char2.id}).exec(function() {});
      }

      if ( target === 'character' ) {
        Character.update({id: char2.id}, {
          currentHP: char2.currentHP > 0 ? math.round(char2.currentHP) : 0
        }).exec(function() {});
      }

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

