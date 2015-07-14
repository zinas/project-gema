var
  React = require('react'),
  explain = require('./../../js/lib/explain'),
  cn = require('classnames');

module.exports = React.createClass({
  sell: function () {
    alert('Item trading coming soon!');
  },
  equip: function () {
    io.socket.post('/game/equip', {
      type: this.props.type,
      id: this.props.item.id
    }, (function (item) {
      console.log(this.props);
      this.props.onEquip(item, this.props.type);
    }).bind(this));
  },
  render: function() {
    if ( !this.props.item ) return (<div>Item not found</div>);
    return (
      <div className="equipment-item">
        <h5>{this.props.item.name} <small>(Lvl. {this.props.item.level})</small></h5>
        {this.props.item.damage ? (
        <h6>Damage {this.props.item.damage}</h6>
        ) : ''}
        {this.props.item.protection ? (
        <h6>Protection {this.props.item.protection}</h6>
        ) : ''}
        <p>{this.props.item.description}</p>
        {this.props.item.modifiers.map(function (modifier) {
          return (<p className="small" dangerouslySetInnerHTML={{__html:explain(modifier)}}></p>)
        })}
        {this.props.showActions ? (
        <div>
          <button
            disabled={this.props.item.level > this.props.character.level}
            onClick={this.equip}
            className="btn btn-primary btn-xs">Equip</button>&nbsp;
          <button onClick={this.sell} className="btn btn-success btn-xs">Sell ($ {this.props.item.value/10})</button>
        </div>
        ) :''}
      </div>
    );
  }
});