var React = require('react');

module.exports = React.createClass({
  move: function (e) {
    var coords = {
      x: this.props.character.location.x,
      y: this.props.character.location.y
    };

    switch ( e.currentTarget.getAttribute('data-direction') ) {
      case 'up':
        coords.y -= 1;
        break;
      case 'down':
        coords.y += 1;
        break;
      case 'left':
        coords.x -= 1;
        break;
      case 'right':
        coords.x += 1;
        break;
    }

    io.socket.post(
      '/character/move',
      {coords: coords},
      (function (character) {
        this.props.onMove(character);
      }).bind(this));

  },
  canIMove: function (direction) {
    var
      level = this.props.character.continent,
      area = this.props.character.location;

    switch (direction) {
      case 'up':
        return area.y > 1;
      case 'down':
        return area.y < level.height;
      case 'left':
        return area.x > 1;
      case 'right':
        return area.x < level.width;
    }

    return false;
  },
  render: function() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Movement</h3>
        </div>
        <div className="panel-body">
          <button
            className="btn btn-primary btn-up"
            onClick={this.move}
            disabled={!this.canIMove('up')}
            data-direction="up"><span className="fa fa-arrow-up"></span></button>
          <div className="clearfix">
            <button
              className="btn btn-primary btn-left"
              onClick={this.move}
              disabled={!this.canIMove('left')}
              data-direction="left"><span className="fa fa-arrow-left"></span></button>
            <button
              className="btn btn-primary btn-right"
              onClick={this.move}
              disabled={!this.canIMove('right')}
              data-direction="right"><span className="fa fa-arrow-right"></span></button>
          </div>
          <button
            className="btn btn-primary btn-down"
            onClick={this.move}
            disabled={!this.canIMove('down')}
            data-direction="down"><span className="fa fa-arrow-down"></span></button>
        </div>
      </div>
    );
  }
});