/**
* Profession.js
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
    shorthand: {
      type: 'string',
      required: true,
      unique: true
    },
    hp: {
      type: 'integer',
      required: true
    },
    attack: {
      type: 'integer',
      required: true
    },
    defence: {
      type: 'integer',
      required: true
    },
    description: {
      type: 'string'
    }
  }
};

