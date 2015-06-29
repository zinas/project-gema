var
  React = require('react'),
  data = require('./../../../js/lib/data.js'),
  CharacterSheet = require('./../../components/character-sheet'),
  Hud = require('./../../components/hud'),
  TopNavigation = require('./../../components/top-navigation'),
  Chat = require('./../../components/chat');

var CharacterView = React.createClass({
  getInitialState: function () {
    return {
      character: data('character'),
      user: data('user')
    };
  },
  onCharacterUpdated: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
    <div className="page-container">

      <div className="page-sidebar scroll">
        <Hud character={this.state.character} />
      </div>

      <div className="page-content">
        <TopNavigation user={this.state.user} />

        <div className="content-frame">
          <div className="content-frame-top">
            <div className="page-title">
              <h2 data-js="frame-title">Vital signs</h2>
            </div>
          </div>

          <div style={{display: 'block', minHeight: '710px'}} className="content-frame-right">
            <Chat />
          </div>

          <div className="content-frame-body content-frame-body-left">
            <CharacterSheet character={this.state.character} onRefresh={this.onCharacterUpdated} />
          </div>

        </div>
      </div>
    </div>
    );
  }
});

React.render(<CharacterView />, document.querySelector('#mainMountNode'));