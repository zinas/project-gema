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

  getButtonClass: function (level) {
    var className = 'btn btn-xs ';
    var diff = this.props.character.level - level;
    if ( diff > 3 ) {
      className += 'btn-default';
    } else if ( diff > -1 ) {
      className += 'btn-success';
    } else if ( diff > -3 ) {
      className += 'btn-warning';
    } else {
      className += 'btn-danger';
    }
    return className;
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
              <p>
                <a
                  key={monster.id}
                  className={this.getButtonClass(monster.level)}
                  onClick={this.fight}
                  data-target="monster"
                  data-id={monster.id}>
                  <span className="fa fa-bug"></span> {monster.name} (lvl. {monster.level})
                </a>
              </p>
            )
          }).bind(this))}
          {this.props.area.characters.map((function (character) {
            return (
              <p>
                <a
                  key={character.id}
                  className={this.getButtonClass(character.level)}
                  onClick={this.fight}
                  data-target="character"
                  data-id={character.id}>
                  <span className="fa fa-male"></span> {character.name} (lvl. {character.level})
                </a>
              </p>
            )
          }).bind(this))}
        </div>
      </div>
    );
  }
});













