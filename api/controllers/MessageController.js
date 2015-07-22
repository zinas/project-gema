var Promise = require('bluebird');
/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getChat: function (req, res) {
    var messages = Message.find({
      or: [
        { recipient: res.locals.character.id },
        { recipient: null },
        { sender: res.locals.character.id }
      ],
      sort: 'createdAt DESC',
      limit: 30
    })
    .populateAll();

    var characters = Character.find({online: true}).populate('profession').then(function (c) {
      var characters = c.filter(function (character) {
        return c.id !== res.locals.character.id;
      });
      return characters;
    }, function (err) {
      console.log(err);
    });

    Promise.all([messages, characters]).spread(function (msgs, chars) {
      return res.json({
        messages: msgs,
        characters: chars
      });
    });
  },

  create: function (req, res) {
    var data = Message.parse(req.param('content'));
    data.repeat = req.param('content').replace(data.message, '');
    if ( data.room !== 'private') {
      Message.create({
        content: data.message,
        sender: res.locals.character.id,
        recipient: null,
        room: data.room
      }).then(function (message) {
        message.sender = res.locals.character;
        sails.sockets.blast('new-message', message);
        res.json({data: data, message: message});
      }, function (error) {
        res.json({error: error});
      });
    } else {
      Character.findOne({name: data.recipient}).then(function (character) {
        if ( !character ) {
          return res.json({error: 'Connection to the requested Avatar could not be established. Our archives show that such Avatar does not exist.'});
        }
        Message.create({
          content: data.message,
          sender: res.locals.character.id,
          recipient: character.id,
          room: null
        }).then(function (message) {
          message.sender = res.locals.character;
          message.recipient = character;
          sails.sockets.blast('new-message-'+message.recipient.id, message);
          res.json({data: data, message: message});
        }, function (error) {
          res.json({error: error});
        });
      }, function (error) {
        res.json({error: error});
      });
    }

  }
};

