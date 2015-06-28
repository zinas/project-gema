/**
* Character.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Promise = require('bluebird');

module.exports = {

  attributes: {
    ///////// Base characteristics
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    level: {
      type: 'integer',
      defaultsTo: 1
    },

    xp: {
      type: 'integer',
      defaultsTo: 0
    },

    currentHP: { type: 'integer' },
    maxHP: { type: 'integer' },

    // ideas on what to affect:
    // attack, damage, crit, weapons usage
    aim: { type: 'integer', defaultsTo: 10 },

    // ideas on what to affect:
    // attack, defense, initiative, crit
    speed: { type: 'integer', defaultsTo: 10 },

    // ideas on what to affect:
    // defense, hp, damage reduction, armor usage
    stamina: { type: 'integer', defaultsTo: 10 },

    baseStats: function () {
      return {
        attack: this.profession.attack,
        defence: this.profession.defence
      }
    },

    ///////// Inventory slots
    weapon: { model: 'weapon' },
    armor: { model: 'armor' },
    implant: { model: 'implant' },


    user: { model: 'user', required: true },

    location: { model: 'area' },
    continent: { model: 'level' },

    profession: { model: 'profession' },
    skills: { collection: 'characterSkill', via: 'character' }
  },

  beforeCreate: function ( model, next ) {
    var level = Level.findOne({rank: 1}).populateAll();
    var profession = Profession.findOne(model.profession);

    Promise
    .all([profession, level])
    .spread(function (profession, level) {

      // Set default values for location related properties
      var area = _.find(level.areas, function (area) {
        return area.x === 1 && area.y === 1;
      });
      model.continent = level.id;
      model.location = area.id;

      // Set default values for profession related properties
      model.maxHP = profession.hp;
      model.currentHP = profession.hp;

      next();
    }, function (error) {
      next(error);
    });
  },

  beforeUpdate: function ( model, next ) {
    Character.findOne(this.update.arguments[0]).then(function (character) {
      if ( model.level ) {
        throw 'need to update update for the profession';
        var profession = _.find(sails.config.constants.PROFESSIONS, function (prof) {
          return prof.ID === character.profession;
        });

        model.maxHP = model.level * profession.HP_PER_LEVEL;
      }
      if ( model.location && model.location !== character.location) {
        sails.sockets.blast('character-left-area-'+character.location, {character:character});
        sails.sockets.blast('character-joined-area-'+model.location, {character:character});
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
        if ( !character ) {
          return null;
        }
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
  },

  move: function (where, coords) {
    return Area.findOne({
      x: coords.x,
      y: coords.y
    }).then(function (area) {
      return Character.update(where, {
        location: area.id
      }).then(function ( characters ) {
        return Character.findOnePopulated(characters[0].id);
      });
    });
  }
};

// Validations to do
// 1) if equiping weapon, check whether it belongs to him
// 2) if changing continent, check for the maxAllowedLevel
// 3) if changing area, check if area exists in the current continent
// 4) if changing attibutes, check if the sum isnt over the level allowance
// 5) if changing skills, check if the sum isnt over the level allowance