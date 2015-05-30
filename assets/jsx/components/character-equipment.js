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
    utils.ajax('/weapon').then( (function (weapons) {
      this.setState({weapons: weapons});
    }).bind(this) );
    utils.ajax('/armor').then( (function (armors) {
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
    return this.state.character.weapon ? this.state.character.weapon : {};
  },
  getEquippedArmor: function () {
    return this.state.character.armor ? this.state.character.armor : {};
  },
  onArmorSelected: function (e) {
    if ( e.target.value == -1 ) {
     io.socket.delete(
      '/character/'+this.state.character.id+'/armor',
      {}
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
     io.socket.delete(
      '/character/'+this.state.character.id+'/weapon',
      {}
      (function (character) {
        this.setState({character: character});
      }).bind(this));
    } else {
     io.socket.put(
      '/character/'+this.state.character.id,
      { weapon: e.target.value },
      (function (resp) {
        console.log('weapon updated', resp);
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
          <td>{this.getEquippedArmor().name}</td>
          <td>
            <select onChange={this.onArmorSelected}>
              <option value="-1">None</option>
              {this.state.armors.map(function (armors) {
                return <option key={armors.id} value={armors.id}>{armors.name}</option>;
              })}
            </select>
          </td>
        </tr>
        <tr>
          <th>Weapon</th>
          <td>{this.getEquippedWeapon().name}</td>
          <td>
            <select onChange={this.onWeaponSelected}>
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