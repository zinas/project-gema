var React = require('react');
var cn = require('classnames');
var moment = require('moment');
var pubsub = require('pubsub-js');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      history: [],
      repeat: '',
      messages: [],
      onlineCharacters: []
    };
  },
  componentDidUpdate: function () {
    this.refs.messagesWrapper.getDOMNode().scrollTop = this.refs.messagesWrapper.getDOMNode().scrollHeight;
  },
  onOnlineClick: function (event) {
    this.refs.message.getDOMNode().value = '/m "' + event.currentTarget.getAttribute('rel') + '" ';
    this.refs.message.getDOMNode().focus();
    event.preventDefault();
  },
  renderMessage: function (message) {
    var colorClass;
    switch (message.room) {
      case 'general':
        colorClass = 'text-primary';
        break;
      case 'guild':
        colorClass = 'text-success';
        break;
      case 'trade':
        colorClass = 'text-info';
        break;
      default:
        colorClass = 'text-danger';
    }
    return (
  <div key={message.id} className={cn('item item-visible')}>
    <div className="text">
      <div className="heading">
        <strong className={colorClass}>
          {message.recipient && message.recipient.id !== this.props.character.id ? 'To: '+message.recipient.name : message.sender.name}
        </strong>
        <span className="date">{moment(message.createdAt).format('D/M H:m')}</span>
      </div>
      {message.content}
    </div>
  </div>
    );
  },
  addCharacter: function (character) {
    if ( character.id === this.props.character.id ) return;
    var characters = this.state.onlineCharacters;
    characters.push(character);
    this.setState({onlineCharacters: characters});
  },
  removeCharacter: function (character) {
    var characters = this.state.onlineCharacters.filter(function (c) {
      return c.id !== character.id;
    });

    this.setState({onlineCharacters: characters});
  },
  componentDidMount: function () {
    this.getChat();
    io.socket.on('new-message', this.addMessage);
    io.socket.on('new-message-'+this.props.character.id, this.addMessage);
    io.socket.on('character-is-online', this.addCharacter);
    io.socket.on('character-is-offline', this.removeCharacter);
  },
  addMessage: function (message) {
    var msg = this.state.messages;
    msg.unshift(message);
    this.setState({messages:msg});
  },
  getChat: function () {
    io.socket.get('/message/getChat', (function (data) {
      this.setState({messages: data.messages, onlineCharacters: data.characters});
    }).bind(this));
  },
  onKeyUp: function (e) {
    if ( e.keyCode === 38 ) {
      this.refs.message.getDOMNode().value = this.state.repeat;
      e.stopPropagation();
    }
    if ( e.keyCode === 13 ) {
      this.postMessage();
    }
  },
  postMessage: function () {
    io.socket.post('/message/create', {content: this.refs.message.getDOMNode().value}, (function (res) {
      if ( res.error ) {
        pubsub.publish('show-popup', {
          box: 'danger',
          title: 'Communication protocol error',
          content: res.error
        });
        return;
      }
      this.addMessage(res.message);
      this.refs.message.getDOMNode().value = '';
      var history = this.state.history;
      history.push(this.refs.message.getDOMNode().value);
      this.setState({
        repeat: res.data.repeat,
        history: history
      });
    }).bind(this));
  },
  render: function() {
    return (
  <div className="chat-wrapper">
    <div className="panel online-users-list">
      <div className="panel-body">
      <h6>Online now</h6>
      {this.state.onlineCharacters.map( (function (character) {
        return (
          <div key={character.id} className="links-list">
            <a
              href=""
              onClick={this.onOnlineClick}
              className="links-list-item text-danger"
              rel={character.name}>
              {character.name}, {character.profession.name} Lvl. {character.level}
            </a>
          </div>
        )
      }).bind(this))}
      </div>
    </div>
    <div className="messages-wrapper" ref="messagesWrapper">
      <div className="messages">
        {this.state.messages.map((function (message, i) {
          return this.renderMessage(message);
        }).bind(this))}
      </div>
    </div>
    <div className="panel panel-default">
      <div className="panel-body panel-body-search">
        <div className="input-group">
          <input className="form-control" onKeyUp={this.onKeyUp} ref="message" placeholder="Your message..." type="text" />
          <div className="input-group-btn">
            <button onClick={this.postMessage} className="btn btn-default">Send</button>
          </div>
        </div>
      </div>
    </div>
    <div className="panel panel-default">
      <div className="panel-body panel-body-search">
        <button type="button" className="btn btn-default btn-xs">All</button>&nbsp;
        <button type="button" className="btn btn-primary btn-xs">General</button>&nbsp;
        <button type="button" className="btn btn-danger btn-xs">Private</button>&nbsp;
        <button type="button" className="btn btn-info btn-xs">Trade</button>&nbsp;
      </div>
    </div>
  </div>
    );
  }
});