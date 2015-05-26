var
  React = require('React'),
  CharacterSelector = require('./../../components/character-selector'),
  LevelupForm = require('./../../components/levelup-form');

var LevelupView = React.createClass({
  getInitialState: function () {
    return { character: {name: 'not!'} };
  },
  onCharacterSelected: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
      <div>
        <CharacterSelector onChange={this.onCharacterSelected} />
        <div>selected character: {this.state.character.name} </div>
      </div>
    );
  }
});

React.render(<LevelupView />, document.getElementById('mainMountNode'));