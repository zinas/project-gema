var
  React = require('React'),
  utils = require('./../../js/lib/utils');

var ClassSelector = React.createClass({
  getInitialState: function () {
    return { characters: [] };
  },
  componentDidMount: function () {
    utils.ajax('/character').then(function () {});
  },
  render: function() {
    return (
      <select>
        {thegrid.config.PROFESSIONS.map(function (profession) {
          return <option key={profession.ID} value={profession.ID}>{profession.LABEL}</option>
        })}
      </select>
    );
  }
});

module.exports = ClassSelector;