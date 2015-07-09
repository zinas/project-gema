var
  React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      characters: [],
      monsters: []
    };
  },

  fight: function (e) {
    io.socket.post('/game/fight', {
      target: e.currentTarget.getAttribute('data-target'),
      id: e.currentTarget.getAttribute('data-id')
    }, (function (result) {
      this.props.onResult(result);
    }).bind(this));
  },

  render: function() {
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.area.name}&nbsp;
            <small>{this.props.level.name} ({this.props.area.x},{this.props.area.y})</small>
          </h3>
        </div>
        <div className="panel-body">
          <p>{this.props.level.description}</p>
          {this.props.area.monsters.map( (function (monster) {
            return (
              <a
                key={monster.id}
                className="btn btn-danger btn-rounded btn-attack"
                onClick={this.fight}
                data-target="monster"
                data-id={monster.id}>
                <span className="fa fa-bug"></span> {monster.name} (lvl. {monster.level})
              </a>
            )
          }).bind(this))}
          {this.props.area.characters.map(function (character) {
            return (
              <a key={character.id} className="btn btn-danger btn-rounded" href={'/game/fight/character/'+character.id}>
                <span className="fa fa-male"></span> {character.name} (lvl. {character.level})
              </a>
            )
          })}
        </div>
      </div>
    );
  }
});













