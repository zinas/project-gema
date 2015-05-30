var
  React = require('React'),
  CharacterSelector = require('./../../components/character-selector'),
  CharacterEquipment = require('./../../components/character-equipment'),
  CharacterImplants = require('./../../components/character-implants');

var InventoryView = React.createClass({
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
        <CharacterEquipment
          character={this.state.character}
          onEquipmentChanged={this.onCharacterUpdated}/>
        <CharacterImplants character={this.state.character} />
      </div>
    );
  }
});

React.render(<InventoryView />, document.getElementById('mainMountNode'));