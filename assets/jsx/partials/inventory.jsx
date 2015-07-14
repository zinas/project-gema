var
  React = require('react'),
  Item = require('./../components/item.jsx'),
  cn = require('classnames');


module.exports = React.createClass({
  onEquip: function (item, type) {
    var character = this.props.character;
    character[type] = item;
    this.props.onCharacterUpdated(character);
  },
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
          {this.props.character.weapons.map((function (weapon) {
            var eqid = this.props.character.weapon ? this.props.character.weapon.id : 0;
            return (
            <li className={cn('list-group-item', {hidden: weapon.id === eqid})}>
              <Item onEquip={this.onEquip} item={weapon} type="weapon" showActions="true" character={this.props.character} />
            </li>)
          }).bind(this))}
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
          {this.props.character.armors.map((function (armor) {
            var eqid = this.props.character.armor ? this.props.character.armor.id : 0;
            return (
            <li className={cn('list-group-item', {hidden: armor.id === eqid})}>
              <Item onEquip={this.onEquip} item={armor} type="armor" showActions="true" character={this.props.character} />
            </li>)
          }).bind(this))}
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
          {this.props.character.implants.map((function (implant) {
            var eqid = this.props.character.implant ? this.props.character.implant.id : 0;
            return (
            <li className={cn('list-group-item', {hidden: implant.id === eqid})}>
              <Item onEquip={this.onEquip} item={implant} type="implant" showActions="true" character={this.props.character} />
            </li>)
          }).bind(this))}
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