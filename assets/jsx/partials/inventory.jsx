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
        <ul className="list-group border-bottom">
          {this.props.character.weapons.map(function (weapon) {
            return (
            <li className="list-group-item">
              <Item item={weapon} showActions="true" />
            </li>)
          })}
        </ul>
        <div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="panel panel-primary">
      <div className="panel-body panel-body-pricing">
        <h2>Armor</h2>
        {this.props.character.armor ? (
          <div>
            <Item item={this.props.character.armor} />
          </div>
        ) : (
          <p>You currently have no armor equipped</p>
        )}

        <div>
          {this.props.character.armors.map(function (armor) {
            return <Item item={armor} />
          })}
        </div>
      </div>
    </div>
  </div>


  <div className="col-sm-4">
    <div className="panel panel-primary">
      <div className="panel-body panel-body-pricing">
        <h2>Implant</h2>
        {this.props.character.implant ? (
          <div>
            <Item item={this.props.character.implant} />
          </div>
        ) : (
          <p>You currently have no implant equipped</p>
        )}

        <div>
          {this.props.character.implants.map(function (implant) {
            return <Item item={implant} />
          })}
        </div>
      </div>
    </div>
  </div>

</div>
    );
  }
});