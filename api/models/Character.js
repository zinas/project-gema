/**
* Character.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    profession: {
      type: 'string',
      required: true,
      enum: ['fix', 'sol', 'med']
    },

    level: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },

    xp: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    currentHP: {
      type: 'integer',
      required: true
    },

    maxHP: {
      type: 'integer',
      required: true
    },

    aim: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    agility: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    stamina: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    attack: function () {
      return (
        this.level *
        this.professionStats().ATTACK_PER_LEVEL *
        (1 + (this.aim - 10)/100 )
      );
    },

    defence: function () {
      return (
        this.level *
        this.professionStats().DEFENCE_PER_LEVEL *
        (1 + (this.agility - 10)/100 )
      );
    },

    hit: function () {
      return sails.config.constants.STATS.TO_HIT;
    },

    graze: function () {
      return sails.config.constants.STATS.BASE_GRAZE;
    },

    crit: function () {
      return sails.config.constants.STATS.BASE_CRIT;
    },

    grazeMult: function () {
      return sails.config.constants.STATS.GRAZE_MULTIPLIER;
    },

    critMult: function () {
      return sails.config.constants.STATS.CRIT_MULTIPLIER;
    },

    professionStats: function() {
      return _.find(sails.config.constants.PROFESSIONS, (function (prof) {
        return prof.ID === this.profession;
      }).bind(this));
    },

    user: {
      model: 'user'
    },

    location: {
      model: 'area'
    }
  },

  beforeUpdate: function (model, next) {
    var profession = _.find(sails.config.constants.PROFESSIONS, function (prof) {
      return prof.ID === model.profession;
    });
    model.maxHP = model.level * profession.HP_PER_LEVEL;
    model.currentHP = model.maxHP;

    next();
  }
};

