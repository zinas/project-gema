/**
* MonsterSkill.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    monster: {
      model: 'monster'
    },

    skillDetails: {
      model: 'skill'
    },

    level: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
  }
};

