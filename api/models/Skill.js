/**
* Skill.js
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

    profession: { model: 'profession' },

    action: {
      type: 'json',
      required: true
    }
  }
};


// percentage to activate
// is it damage or heal
// amount

// stat is affects
// how much
//

