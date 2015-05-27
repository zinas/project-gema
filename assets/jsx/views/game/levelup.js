var
  React = require('React'),
  CharacterSelector = require('./../../components/character-selector'),
  LevelupForm = require('./../../components/levelup-form');

var LevelupView = React.createClass({
  getInitialState: function () {
    return { character: {name: ''} };
  },
  onCharacterUpdated: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
      <div>
        <CharacterSelector onChange={this.onCharacterUpdated} />
        <LevelupForm character={this.state.character} onRefresh={this.onCharacterUpdated} />
      </div>
    );
  }
});

React.render(<LevelupView />, document.getElementById('mainMountNode'));