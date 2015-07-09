var math = require('mathjs');

/**
* Monster.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: { type: 'string' },
    level: { type: 'integer' },

    currentHP: { type: 'integer' },
    maxHP: { type: 'integer' },

    aim: { type: 'integer', defaultsTo: 10 },
    speed: { type: 'integer', defaultsTo: 10 },
    stamina: { type: 'integer', defaultsTo: 10 },

    attack: { type: 'integer', defaultsTo: 10 },
    defence: { type: 'integer', defaultsTo: 10 },

    weapon: { type: 'json' },
    armor: { type: 'json' },

    baseStats: function () {
      return {
        attack: this.attack,
        defence: this.defence
      }
    },

    location: { model: 'area', required: true },
    continent: { model: 'level', required: true },
  },

  findOnePopulated : function ( params ) {
    return Monster
      .findOne(params)
      .populateAll();
  },

  afterCreate: function (model, next) {
    sails.sockets.blast('area-changed-'+model.location, {type: 'addMonster', data: model});
    next();
  },

  afterDestroy: function (models, next) {
    models.forEach(function (model) {
      sails.sockets.blast('area-changed-'+model.location, {type: 'removeMonster', data: model});
    });
    next();
  },

  spawn: function (area, num) {
    num = num || 1;
    for ( var i = 0; i < num; i++ ) {
      MonsterTemplate.find({
        level: {'>=': area.level.minLevelAllowed, '<=': area.level.maxLevelAllowed}
      }).then(function (templates) {
        var tpl_id = math.randomInt(0, templates.length);
        var tpl = templates[tpl_id];

        function getStat(val) {
          var min = math.round(0.8*val);
          var max = math.round(1.2*val);

          return math.random(min, max);
        }

        var hp = getStat(tpl.maxHP);

        return Monster.create({
          name: tpl.name,
          level: tpl.level,
          aim: getStat(tpl.aim),
          speed: getStat(tpl.speed),
          stamina: getStat(tpl.stamina),
          attack: getStat(tpl.attack),
          defence: getStat(tpl.defence),
          maxHP: hp,
          currentHP: hp,
          weapon: tpl.weapon,
          armor: tpl.armor,
          location: area.id,
          continent: area.level
        }).then(function () {}, function (err) {
          console.log(require('util').inspect(err));
        });
      });
    }
  }

};