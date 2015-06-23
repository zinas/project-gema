/**
* Monster.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    currentHP: { type: 'integer' },
    maxHP: { type: 'integer' },

    aim: { type: 'integer', defaultsTo: 10 },
    speed: { type: 'integer', defaultsTo: 10 },
    stamina: { type: 'integer', defaultsTo: 10 },

    template: { model: 'monsterTemplate', required: true },

    location: { model: 'area', required: true },
    continent: { model: 'level', required: true },

    skills: { collection: 'monsterSkill', via: 'monster' }
  },

  findOnePopulated : function ( params ) {
    var promise = Monster
      .findOne(params)
      .populateAll()
      .then(function (monster) {
        if ( !monster ) {
          return null;
        }
        var ids = [];
        monster.skills.forEach(function (skill) {
          ids.push(skill.skill);
        });

        return Skill.find({id: ids}).then(function (skills) {
          monster.skills = _.map(monster.skills, function(skill){
              skill.details = _.findWhere(skills, {id: skill.skill})
              return skill;
          });

          return monster;
        });
      });
    return promise;
  }
};