/**
* MonsterTemplate.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: { type: 'string' },
    level: { type: 'integer' },

    maxHP: { type: 'integer' },

    aim: { type: 'integer', defaultsTo: 10 },
    speed: { type: 'integer', defaultsTo: 10 },
    stamina: { type: 'integer', defaultsTo: 10 },

    weapon: { type: 'json' },
    armor: {type: 'json' }
  }
};

