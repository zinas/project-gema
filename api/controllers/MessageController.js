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
    .populate('sender')
    .then(function (messages) {
      return res.json(messages);
    });
  },

  create: function (req, res) {
    Message.create({
      content: req.param('content'),
      sender: res.locals.character.id,
      recipient: null,
      room: 'general'
    }).then(function (message) {
      message.sender = res.locals.character;
      if ( !res.recipient ) {
        sails.sockets.blast('new-message', message);
      } else {
        sails.sockets.blast('new-message-'+message.recipient, message);
      }
      res.json(message);
    }, function (error) {
      console.log('not ok', error);
    });
  }
};

