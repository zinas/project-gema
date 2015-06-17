var
  React = require('React'),
  Iso = require('./../../../js/lib/iso.js'),
  CharacterSheet = require('./../../components/character-sheet');

var CharacterView = React.createClass({
  getInitialState: function () {
    return {
      character: Iso('character')
    };
  },
  onCharacterUpdated: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
      <div>
        <CharacterSheet character={this.state.character} onRefresh={this.onCharacterUpdated} />
      </div>
    );
  }
});

React.render(<CharacterView />, document.getElementById('mainMountNode'));