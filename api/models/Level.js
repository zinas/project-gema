/**
* Level.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    uuid: {
      type: 'string',
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string'
    },

    rank: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },

    maxLevelAllowed: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },

    width: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },

    height: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },

    areas: {
      collection: 'area',
      via: 'level'
    }
  }
};

