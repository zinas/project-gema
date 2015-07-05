var React = require('react');
var cn = require('classnames');
var moment = require('moment');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      messages: []
    };
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
        <strong className={colorClass}>{message.sender.name}</strong>
        <span className="date">{moment(message.createdAt).format('D/M H:m')}</span>
      </div>
      {message.content}
    </div>
  </div>
    );
  },
  componentDidMount: function () {
    this.getMessages();
    io.socket.on('new-message', this.addMessage);
    io.socket.on('new-message-'+this.props.character.id, this.addMessage);
  },
  addMessage: function (message) {
    var msg = this.state.messages;
    msg.unshift(message);
    this.setState({messages:msg});
  },
  getMessages: function () {
    io.socket.get('/message/getMine', (function (messages) {
      this.setState({messages: messages});
    }).bind(this));
  },
  onKeyUp: function (e) {
    if ( e.keyCode === 13 ) {
      this.postMessage();
    }
  },
  postMessage: function () {
    io.socket.post('/message/create', {content: this.refs.message.getDOMNode().value}, (function (message) {
      var messages = this.state.messages;
      this.setState({messages: messages});
      this.refs.message.getDOMNode().value = '';
    }).bind(this));
  },
  render: function() {
    return (
  <div className="chat-wrapper">
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
        <button type="button" className="btn btn-success btn-xs">Guild</button>&nbsp;
        <button type="button" className="btn btn-danger btn-xs">Private</button>&nbsp;
        <button type="button" className="btn btn-info btn-xs">Trade</button>&nbsp;
      </div>
    </div>
    <div className="messages">
      {this.state.messages.map((function (message, i) {
        return this.renderMessage(message);
      }).bind(this))};
    </div>
  </div>
    );
  }
});