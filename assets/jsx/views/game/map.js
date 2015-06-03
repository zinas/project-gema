var
  React = require('React'),
  CharacterSelector = require('./../../components/character-selector');

var MapView = React.createClass({
  getInitialState: function () {
    return {
      character: {
        location: {x: 1, y: 1},
        continent: {height: 1, width: 1}
      },
      others: []
    };
  },
  componentWillMount:function () {

  },
  removeListeners: function () {
    if ( this.state.character.location ) {
      io.socket.removeAllListeners('character-joined-area-'+this.state.character.location.id);
      io.socket.removeAllListeners('character-left-area-'+this.state.character.location.id);
    }
  },
  addListeners: function () {
    io.socket.on('character-left-area-'+this.state.character.location.id, this.fetchOthers);
    io.socket.on('character-joined-area-'+this.state.character.location.id, this.fetchOthers);
  },
  fetchOthers: function () {
    io.socket.get('/character', {
      id: {'!' : [this.state.character.id] },
      location: this.state.character.location.id
    }, (function (characters) {
      this.setState({others: characters});
    }).bind(this));
  },
  onCharacterUpdated: function (character) {
    this.removeListeners();
    this.setState({character: character}, (function () {
      this.fetchOthers();
      this.addListeners();
    }).bind(this) );
  },
  move: function (e) {
    var coords = {
      x: this.state.character.location.x,
      y: this.state.character.location.y
    };

    switch ( e.target.getAttribute('data-direction') ) {
      case 'up':
        coords.y += 1;
        break;
      case 'down':
        coords.y -= 1;
        break;
      case 'left':
        coords.x -= 1;
        break;
      case 'right':
        coords.y += 1;
        break;
    }

    this.removeListeners();
    io.socket.post(
      '/character/move',
      {coords: coords, id: this.state.character.id},
      (function (character) {
        this.setState({character: character}, (function () {
          this.fetchOthers();
          this.addListeners();
        }).bind(this) );
      }).bind(this));
  },
  canIMove: function (direction) {
    var
      level = this.state.character.continent,
      area = this.state.character.location;

    switch (direction) {
      case 'up':
        return area.y < level.height;
      case 'down':
        return area.y > 1;
      case 'left':
        return area.x > 1;
      case 'right':
        return area.x <= level.width;
    }

    return false;
  },
  render: function() {
    return (
      <div>
        <CharacterSelector onChange={this.onCharacterUpdated} />
        <div>Current character: {this.state.character.name}</div>
        <div>Coords: {this.state.character.location.x}, {this.state.character.location.y}</div>
        <br/><br/>
        {this.state.others.map(function (character) {
          return <div>{character.name}</div>
        })}
        <br/><br/>
        <button
          onClick={this.move}
          disabled={!this.canIMove('up')}
          data-direction="up">Up</button>
        <button
          onClick={this.move}
          disabled={!this.canIMove('down')}
          data-direction="down">Down</button>
        <br/>
        <button
          onClick={this.move}
          disabled={!this.canIMove('left')}
          data-direction="left">Left</button>
        <button
        onClick={this.move}
        disabled={!this.canIMove('right')}
        data-direction="right">Right</button>
      </div>
    );
  }
});

React.render(<MapView />, document.getElementById('mainMountNode'));