var
  React = require('react'),
  explain = require('./../../js/lib/explain');

console.log('Item dep loaded');

module.exports = React.createClass({
  renderModifers: function () {

  },
  render: function() {
    if ( !this.props.item ) return (<div>Item not found</div>);
    return (
      <div className="equipment-item">
        <h5>{this.props.item.name}</h5>
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
          <button className="btn btn-primary btn-xs">Equip</button>&nbsp;
          <button className="btn btn-success btn-xs">Sell ($ {this.props.item.value/10})</button>
        </div>
        ) :''}
      </div>
    );
  }
});