/**
* Character.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    ///////// Base characteristics
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
      defaultsTo: 1
    },

    xp: {
      type: 'integer',
      defaultsTo: 0
    },

    currentHP: {
      type: 'integer'
    },

    maxHP: {
      type: 'integer'
    },

    // ideas on what to affect:
    // attack, damage, crit, weapons usage
    aim: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    ///////// Attributes

    // ideas on what to affect:
    // attack, defense, initiative, crit
    speed: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    // ideas on what to affect:
    // defense, hp, damage reduction, armor usage
    stamina: {
      type: 'integer',
      required: true,
      defaultsTo: 10
    },

    ///////// Inventory slots
    weapon: { model: 'weapon' },
    armor: { model: 'armor' },
    implant: { model: 'implant' },

    ///////// Combat stats
    attack: function () {
      return Math.round(
        this.level *
        this.professionStats().ATTACK_PER_LEVEL *
        (1 + (this.aim - 10)/100 )
      );
    },

    defence: function () {
      return Math.round(
        this.level *
        this.professionStats().DEFENCE_PER_LEVEL *
        (1 + (this.speed - 10)/100 )
      );
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
    },

    skills: {
      collection: 'characterSkill',
      via: 'character'
    }
  },

  beforeCreate: function ( model, next ) {
    var profession = _.find(sails.config.constants.PROFESSIONS, function (prof) {
      return prof.ID === model.profession;
    });

    model.maxHP = model.level * profession.HP_PER_LEVEL;
    model.currentHP = model.maxHP;

    next();
  },

  beforeUpdate: function ( model, next ) {
    Character.findOne({id: this.update.arguments[0]}).exec(function (err, character) {
      if ( model.level ) {
        var profession = _.find(sails.config.constants.PROFESSIONS, function (prof) {
          return prof.ID === character.profession;
        });

        model.maxHP = model.level * profession.HP_PER_LEVEL;
      }
      next();
    });
  },

  afterCreate: function (character, next) {
    Skill.find({
      or: [
        {profession: character.profession},
        {profession: 'all'}
      ]
    }).exec(function (error, skills) {
      _.forEach(skills, function (skill) {
        CharacterSkill.create({
          character: character.id,
          skill: skill.id
        }).exec(function () {});
      });
    });

    next();
  },

  findOnePopulated : function ( params ) {
    var promise = Character
      .findOne(params)
      .populateAll()
      .then(function (character) {
        var ids = [];
        character.skills.forEach(function (skill) {
          ids.push(skill.skill);
        });

        return Skill.find({id: ids}).then(function (skills) {
          character.skills = _.map(character.skills, function(skill){
              skill.details = _.findWhere(skills, {id: skill.skill})
              return skill;
          });

          return character;
        });
      });
    return promise;
  }
};

