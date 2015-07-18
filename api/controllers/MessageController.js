/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getMine: function (req, res) {
    Message.find({
      or: [
        { recipient: res.locals.character.id },
        { recipient: null },
        { sender: res.locals.character.id }
      ],
      sort: 'createdAt DESC',
      limit: 30
    })
    .populateAll()
    .then(function (messages) {
      return res.json(messages);
    });
  },

  create: function (req, res) {
    var data = Message.parse(req.param('content'));

    if ( data.room !== 'private') {
      Message.create({
        content: data.message,
        sender: res.locals.character.id,
        recipient: null,
        room: data.room
      }).then(function (message) {
        message.sender = res.locals.character;
        sails.sockets.blast('new-message', message);
        res.json(message);
      }, function (error) {
        res.json({error: error});
      });
    } else {
      Character.findOne({name: data.recipient}).then(function (character) {
        console.log('found char', character);
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
          res.json(message);
        }, function (error) {
          res.json({error: error});
        });
      }, function (error) {
        res.json({error: error});
      });
    }

  }
};

