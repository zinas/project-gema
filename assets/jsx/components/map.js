var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      areas: []
    };
  },
  componentDidMount: function () {
    this.getAreas(this.props.level.id);
  },
  componentWillReceiveProps: function (props) {
    this.getAreas(props.level.id);
  },
  getAreas: function (levelId) {
    io.socket.get('/area', {level: levelId}, (function (areas) {
      areas = this.sort(areas);
      this.setState({areas: areas});
    }).bind(this));
  },
  sort: function (areas) {
    var result = [], tmp, y, x;
    for ( y = 1; y <= this.props.level.height; y++ ) {
      for ( x = 1; x <= this.props.level.width; x++ ) {
        tmp = areas.filter(function (area) {
          return area.x === x && area.y === y;
        });
        result.push(tmp[0]);
      }
    }

    return result;
  },
  getClassName: function (area) {
    var className = 'area tile tile-valign';
    if ( area.id === this.props.current.id ) {
      className += ' tile-danger';
    } else {
      className += ' tile-primary';
    }

    return className;
  },
  getContent: function (area) {
    if ( area.id === this.props.current.id ) {
      return (
        <span className="fa fa-male"></span>
      );
    } else {
      return;
    }

    return className;
  },
  render: function() {
    return (
      <div className="panel panel-primary">
      <div className="panel-body">
          <div className="level">
            {this.state.areas.map((function (area) {
              return (
                <div key={area.id} style={{
                  width: 'calc('+(100 / this.props.level.width)+'% - 4px)',
                  height: 'calc('+(100 / this.props.level.height)+'% - 4px)',
                }} className={this.getClassName(area)}>{this.getContent(area)}</div>
              );
            }).bind(this))}
          </div>
        </div>
      </div>
    );
  }
});