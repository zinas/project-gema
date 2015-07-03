var math = require('mathjs');
/**
* Area.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
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
  },

  fillAll: function () {
    Area.find({}).populateAll().then(function (areas) {
      areas.forEach(function (area) {
        if ( area.monsters.length <= 2 ) {
          var spawns = math.randomInt(2, 6);
          Monster.spawn(area, spawns);
        }
      });
    });
  }
};

