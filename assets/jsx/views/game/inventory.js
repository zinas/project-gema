var
  React = require('react'),
  // CharacterSelector = require('./../../components/character-selector'),
  CharacterEquipment = require('./../../components/character-equipment');

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
      </div>
    );
  }
});

React.render(<InventoryView />, document.getElementById('mainMountNode'));