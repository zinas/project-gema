var
  React = require('react'),
  CharacterSheet = require('../components/character-sheet');

module.exports = React.createClass({
  render: function() {
    return (
      <CharacterSheet character={this.props.character} onRefresh={this.props.onCharacterUpdated} />
    );
  }
});