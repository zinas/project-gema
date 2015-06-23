/**
* Area.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    x: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },
    y: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },
    level: {
      model: 'level'
    },
    characters: {
      collection: 'character',
      via: 'location'
    },
    monsters: {
      collection: 'monster',
      via: 'location'
    }
  }
};

