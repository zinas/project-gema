var
  React = require('React'),
  utils = require('./../../js/lib/utils');

var ClassSelector = React.createClass({
  getInitialState: function () {
    return { characters: [] };
  },
  componentDidMount: function () {
    utils.ajax('/character').then( (function (characters) {
      this.setState({characters:characters});
      this.props.onChange(this.getCharacterById(React.findDOMNode(this.refs.character).value));
    }).bind(this) );
  },
  change: function (event) {
    this.props.onChange(this.getCharacterById(event.target.value));
  },
  getCharacterById: function (id) {
    var character = {};
    this.state.characters.forEach(function (c) {
      if ( c.id === id ) {
        character = c;
      }
    });

    return character;
  },
  render: function() {
    return (
      <select onChange={this.change} ref="character">
        {this.state.characters.map(function (character) {
          return <option key={character.id} value={character.id}>{character.name} - lvl. {character.level}</option>
        })}
      </select>
    );
  }
});

module.exports = ClassSelector;