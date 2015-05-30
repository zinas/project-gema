var React = require('React');

var ClassSelector = React.createClass({
  render: function() {
    return (
      <select name={this.props.name}>
        {thegrid.config.PROFESSIONS.map(function (profession) {
          return <option key={profession.ID} value={profession.ID}>{profession.LABEL}</option>
        })}
      </select>
    );
  }
});

module.exports = ClassSelector;