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

  getLabelClass: function (level) {
    var className = 'label ';
    var diff = this.props.character.level - level;
    if ( diff > 3 ) {
      className += 'label-default';
    } else if ( diff > -1 ) {
      className += 'label-success';
    } else if ( diff > -3 ) {
      className += 'label-warning';
    } else {
      className += 'label-danger';
    }
    return className;
  },

  render: function() {
    return (
<div>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Villains</h3>
    </div>
    <div className="panel-body list-group list-group-contacts">
      {this.props.area.monsters.map( (function (monster) {
        return (
          <div key={monster.id} className="list-group-item">
            <span className="contacts-title">{monster.name}</span>
            <p><label className={this.getLabelClass(monster.level)}>lvl. {monster.level}</label></p>
            <div className="list-group-controls">
              <button
                key={monster.id}
                className='btn btn-primary'
                onClick={this.fight}
                data-target="monster"
                disabled={this.props.character.currentHP <= 0}
                data-id={monster.id}>
                Fight
              </button>
            </div>
          </div>
        )
      }).bind(this))}
    </div>
  </div>

  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Avatars</h3>
    </div>
    <div className="panel-body list-group list-group-contacts">
      {this.props.area.characters.filter((function (character) {
        return character.id !== this.props.character.id;
      }).bind(this)).map( (function (character) {
        return (
          <div key={character.id} className="list-group-item">
            <span className="contacts-title">{character.name}</span>
            <p><label className={this.getLabelClass(character.level)}>lvl. {character.level}</label></p>
            <div className="list-group-controls">
              <button
                key={character.id}
                className='btn btn-primary'
                onClick={this.fight}
                data-target="character"
                disabled={this.props.character.currentHP <= 0}
                data-id={character.id}>
                Fight
              </button>
            </div>
          </div>
        )
      }).bind(this))}
    </div>
  </div>
</div>
    );
  }
});













