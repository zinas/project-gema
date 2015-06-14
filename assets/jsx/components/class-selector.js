var React = require('React');

var ClassSelector = React.createClass({
  getInitialState: function () {
    return { professions: [] };
  },
  componentDidMount: function () {
    io.socket.get('/profession', {}, (function (professions) {
      this.setState({professions: professions});
      this.props.onChange(this.getById(React.findDOMNode(this.refs.profession).value));
    }).bind(this));
  },
  change: function (event) {
    this.props.onChange(this.getById(event.target.value));
  },
  getById: function (id) {
    var profession = {};
    this.state.professions.forEach(function (p) {
      if ( p.id === id ) {
        profession = p;
      }
    });
    return profession;
  },
  render: function() {
    return (
      <select className="form-control" name={this.props.name} onChange={this.change} ref="profession">
        {this.state.professions.map(function (profession) {
          return <option key={profession.id} value={profession.id}>{profession.name}</option>
        })}
      </select>
    );
  }
});

module.exports = ClassSelector;