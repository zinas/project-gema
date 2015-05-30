var
  React = require('React');

var CharacterEquipment = React.createClass({
  getInitialState: function () {
    return {
      character: {},
      weapons: [],
      armors: [],
      implants: []
    }
  },
  componentWillMount: function () {
    io.socket.get('/weapon', {}, ( function (weapons) {
      this.setState({weapons: weapons});
    }).bind(this) );

    io.socket.get('/armor', {}, ( function (armors) {
      this.setState({armors: armors});
    }).bind(this) );

    io.socket.get('/implant', {}, ( function (implants) {
      this.setState({implants: implants});
    }).bind(this) );
  },
  componentDidMount: function () {
    this.setState({character: this.props.character});
  },
  componentWillReceiveProps: function (props) {
    this.setState({character: props.character});
  },
  getEquipment: function (type) {
    return this.state.character[type] ? this.state.character[type] : { id: -1 };
  },
  onArmorSelected: function (e) {
    this.changeEquipment('armor', e.target.value);
  },
  onWeaponSelected: function (e) {
    this.changeEquipment('weapon', e.target.value);
  },
  onImplantSelected: function (e) {
    this.changeEquipment('implant', e.target.value);
  },
  changeEquipment: function (type, value) {
    var params = {};
    params[type] = value === -1 ? null : value;
    io.socket.put(
      '/character/'+this.state.character.id,
      params,
      (function (character) {
        this.setState({character: character})
      }).bind(this)
    );
  },
  render: function() {
    return (
    <div>
      <h2>Equipment</h2>
      <table className="stats">
        <tr>
          <th>Armor</th>
          <td>
            <select onChange={this.onArmorSelected} value={this.getEquipment('armor').id}>
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
            <select onChange={this.onWeaponSelected} value={this.getEquipment('weapon').id}>
              <option value="-1">None</option>
              {this.state.weapons.map(function (weapon) {
                return <option key={weapon.id} value={weapon.id}>{weapon.name}</option>;
              })}
            </select>
          </td>
        </tr>
        <tr>
          <th>Implant</th>
          <td>
            <select onChange={this.onImplantSelected} value={this.getEquipment('implant').id}>
              <option value="-1">None</option>
              {this.state.implants.map(function (implant) {
                return <option key={implant.id} value={implant.id}>{implant.name}</option>;
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