var
  React = require('React'),
  utils = require('./../../js/lib/utils');

var CharacterEquipment = React.createClass({
  getInitialState: function () {
    return {
      character: {},
      weapons: [],
      armors: []
    }
  },
  componentWillMount: function () {
    io.socket.get('/weapon', {}, ( function (weapons) {
      this.setState({weapons: weapons});
    }).bind(this) );

    io.socket.get('/armor', {}, ( function (armors) {
      this.setState({armors: armors});
    }).bind(this) );
  },
  componentDidMount: function () {
    this.setState({character: this.props.character});
  },
  componentWillReceiveProps: function (props) {
    this.setState({character: props.character});
  },
  getEquippedWeapon: function () {
    return this.state.character.weapon ? this.state.character.weapon : { id: -1 };
  },
  getEquippedArmor: function () {
    return this.state.character.armor ? this.state.character.armor : { id: -1 };
  },
  onArmorSelected: function (e) {
    if ( e.target.value == -1 ) {
     io.socket.put(
      '/character/'+this.state.character.id,
      { armor: null },
      (function (character) {
        this.setState({character: character});
      }).bind(this));
    } else {
     io.socket.put(
      '/character/'+this.state.character.id,
      { armor: e.target.value },
      (function (character) {
        this.setState({character: character});
      }).bind(this));
    }
  },
  onWeaponSelected: function (e) {
    if ( e.target.value == -1 ) {
     io.socket.put(
      '/character/'+this.state.character.id,
      { weapon: null },
      (function (character) {
        console.log(character);
        this.setState({character: character});
      }).bind(this));
    } else {
     io.socket.put(
      '/character/'+this.state.character.id,
      { weapon: e.target.value },
      (function (character) {
        this.setState({character: character})
      }).bind(this));
    }
  },
  render: function() {
    return (
    <div>
      <h2>Equipment</h2>
      <table className="stats">
        <tr>
          <th>Armor</th>
          <td>
            <select onChange={this.onArmorSelected} value={this.getEquippedArmor().id}>
              <option value="-1">None</option>
              {this.state.armors.map(function (armors) {
                return <option key={armors.id} value={armors.id}>{armors.name}</option>;
              })}
            </select>
          </td>
        </tr>
        <tr>
          <th>Weapon</th>
          <td>
            <select onChange={this.onWeaponSelected} value={this.getEquippedWeapon().id}>
              <option value="-1">None</option>
              {this.state.weapons.map(function (weapon) {
                return <option key={weapon.id} value={weapon.id}>{weapon.name}</option>;
              })}
            </select>
          </td>
        </tr>
      </table>
    </div>
    );
  }
});

module.exports = CharacterEquipment;