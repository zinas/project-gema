/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    content: { type: 'string', required: true },
    sender: { model: 'character', required: true },
    recipient: { model: 'character' },
    room: { enum: ['general', 'trade', 'newbie'], defaultsTo: 'general' }
  },

  parse: function (content) {
    var result;
    if ( result = /^\/t\s+(.*)/.exec(content) ) {
      return { room: 'trade', message: result[1] };
    }
    if ( result = /^\/trade\s+(.*)/.exec(content) ) {
      return { room: 'trade', message: result[1] };
    }

    if ( result = /^\/m\s+"(.*)"\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }
    if ( result = /^\/m\s+([^\s]*)\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }
    if ( result = /^\/msg\s+"(.*)"\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }
    if ( result = /^\/msg\s+([^\s]*)\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }
    if ( result = /^\/message\s+"(.*)"\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }
    if ( result = /^\/message\s+([^\s]*)\s*(.*)/.exec(content) ) {
      return { room: 'private', message: result[2], recipient: result[1] };
    }

    if ( result = /^\/g\s+(.*)/.exec(content) ) {
      return { room: 'general', message: result[1] };
    }
    if ( result = /^\/general\s+(.*)/.exec(content) ) {
      return { room: 'general', message: result[1] };
    }
    return { room: 'general', message: content };
  }
};

