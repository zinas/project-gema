var
  React = require('React'),
  CharacterSelector = require('./../../components/character-selector');

var MapView = React.createClass({
  getInitialState: function () {
    return {
      character: {},
      others: []
    };
  },
  componentWillMount:function () {

  },
  refreshAreaCharacters: function () {

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
        <button onClick={this.move} data-direction="up">Move Up</button>
        <button onClick={this.move} data-direction="down">Move Down</button>
        <button onClick={this.move} data-direction="left">Move Down</button>
        <button onClick={this.move} data-direction="right">Move Down</button>
        <br />
        <button onClick={this.closeSocket}>CloseSockets</button>
      </div>
    );
  }
});

React.render(<MapView />, document.getElementById('mainMountNode'));