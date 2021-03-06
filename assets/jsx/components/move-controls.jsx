var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      moving: false
    };
  },
  move: function (e) {
    var coords = {
      x: this.props.character.location.x,
      y: this.props.character.location.y
    };
    var direction;
    if (e.currentTarget) {
      direction = e.currentTarget.getAttribute('data-direction');
    } else {
      direction = e;
    }
    switch ( direction ) {
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

    this.setState({moving: true});
    io.socket.post(
      '/character/move',
      {coords: coords},
      (function (area) {
        this.props.onMove(area);
        this.setState({moving: false});
      }).bind(this));

  },
  componentDidMount: function () {
    window.addEventListener('keyup', (function (evt) {
      if ( evt.keyCode === 38 && this.canIMove('up') ) {
        this.move('up');
      }
      if ( evt.keyCode === 40 && this.canIMove('down') ) {
        this.move('down');
      }
      if ( evt.keyCode === 37 && this.canIMove('left') ) {
        this.move('left');
      }
      if ( evt.keyCode === 39 && this.canIMove('right') ) {
        this.move('right');
      }
    }).bind(this));
  },
  canIMove: function (direction) {
    var
      level = this.props.character.continent,
      area = this.props.character.location;

    if (this.state.moving) {
      return false;
    }

    if ( this.props.character.currentHP <= 0 ) {
      return false;
    }

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