var React = require('React');

var ClassSelector = React.createClass({
  render: function() {
    return (
      <select name={this.props.name} value={this.props.selected}>
        {thegrid.config.PROFESSIONS.map(function (profession) {
          return <option value={profession.ID}>{profession.LABEL}</option>
        })}
      </select>
    );
  }
});

module.exports = ClassSelector;