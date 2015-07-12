var
  React = require('react'),
  Item = require('./../components/item.jsx');

module.exports = React.createClass({
  render: function() {
    return (
<div className="row">
  <div className="col-sm-4">
    <div className="panel panel-primary">
      <div className="panel-body panel-body-pricing">
        <h4>Equipped Weapon</h4>
        {this.props.character.weapon ? (
          <div>
            <Item item={this.props.character.weapon} />
          </div>
        ) : (
          <p>You currently have no weapon equipped</p>
        )}

        <h4>Inventory</h4>
        {this.props.character.weapons.length > 0 ? (
        <ul className="list-group border-bottom">
          {this.props.character.weapons.map(function (weapon) {
            return (
            <li className="list-group-item">
              <Item item={weapon} showActions="true" />
            </li>)
          })}
        </ul>
        ) : (
          <p>You currently have no weapons in your inventory</p>
        )}
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="panel panel-primary">
      <div className="panel-body panel-body-pricing">
        <h4>Equipped Armor</h4>
        {this.props.character.armor ? (
          <div>
            <Item item={this.props.character.armor} />
          </div>
        ) : (
          <p>You currently have no armor equipped</p>
        )}

        <h4>Inventory</h4>
        {this.props.character.armors.length > 0 ? (
        <ul className="list-group border-bottom">
          {this.props.character.armors.map(function (armor) {
            return (
            <li className="list-group-item">
              <Item item={armor} showActions="true" />
            </li>)
          })}
        </ul>
        ) : (
          <p>You currently have no armors in your inventory</p>
        )}
      </div>
    </div>
  </div>


  <div className="col-sm-4">
    <div className="panel panel-primary">
      <div className="panel-body panel-body-pricing">
        <h4>Implant</h4>
        {this.props.character.implant ? (
          <div>
            <Item item={this.props.character.implant} />
          </div>
        ) : (
          <p>You currently have no implants attached</p>
        )}

        <h4>Inventory</h4>
        {this.props.character.implants.length > 0 ? (
        <ul className="list-group border-bottom">
          {this.props.character.implants.map(function (implant) {
            return (
            <li className="list-group-item">
              <Item item={implant} showActions="true" />
            </li>)
          })}
        </ul>
        ) : (
          <p>You currently have no implants in your inventory</p>
        )}
      </div>
    </div>
  </div>

</div>
    );
  }
});