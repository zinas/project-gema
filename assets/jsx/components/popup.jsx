var
  React = require('react'),
  cn = require('classnames'),
  pubsub = require('pubsub-js');


module.exports = React.createClass({
  getInitialState: function () {
    return {
      visible: false
    };
  },
  componentDidMount: function () {
    pubsub.subscribe('show-popup', (function(msg, data) {
      var box = data.box || 'default';
      var boxes = {
        'default': { icon: 'fa-globe', type: '' },
        'info': { icon: 'fa-info', type: 'message-box-info' },
        'danger': { icon: 'fa-times', type: 'message-box-danger' },
        'success': { icon: 'fa-check', type: 'message-box-success' },
        'warning': { icon: 'fa-warning', type: 'message-box-warning' },
      };
      this.setState({
        visible: true,
        title: data.title,
        content: data.content,
        icon: boxes[box].icon,
        type: boxes[box].type,
        onClose: data.onClose || function () {}
      });
    }).bind(this) );
  },
  close: function () {
    this.state.onClose();
    this.setState({visible: false});
  },
  render: function() {
    return (
<div className={cn('message-box animated fadeIn', this.state.type, {open: this.state.visible})}>
  <div className="mb-container">
    <div className="mb-middle">
      <div className="mb-title">
        <span className={cn('fa', this.state.icon)}></span> {this.state.title}
      </div>
      <div className="mb-content">
        <p>{this.state.content}</p>
      </div>
      <div className="mb-footer">
        <button onClick={this.close} className="btn btn-default btn-lg pull-right mb-control-close">Close</button>
      </div>
    </div>
  </div>
</div>
    );
  }
});