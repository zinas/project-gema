var
  React = require('react'),
  // Router = require('react-router'),
  data = require('./../../../js/lib/data.js'),
  Hud = require('./../../components/hud'),
  TopNavigation = require('./../../components/top-navigation'),
  Chat = require('./../../components/chat');

var Game = React.createClass({
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
    var MainView, title;
    switch (this.props.route) {
      case 'character':
        MainView = require('../../partials/character');
        title = 'Vital Signs';
        break;
      case 'inventory':
        MainView = require('../../partials/inventory');
        title = 'Equipment';
        break;
      case 'explore':
        MainView = require('../../partials/explore');
        title = 'Explore';
        break;
      case 'createCharacter':
        MainView = require('../../partials/createCharacter');
        title = 'Create your character';
        break;
      default:
        title = 'Page not found';
        MainView = require('../../partials/404');
    }
    return (
    <div className="page-container">

      <div className="page-sidebar scroll">
        <Hud character={this.state.character} onCharacterUpdated={this.onCharacterUpdated} />
      </div>

      <div className="page-content">
        <TopNavigation user={this.state.user} />

        <div className="content-frame">
          <div className="content-frame-top">
            <div className="page-title">
              <h2 data-js="frame-title">{title}</h2>
            </div>
          </div>

          <div style={{display: 'block', minHeight: '710px'}} className="content-frame-right">
            <Chat />
          </div>

          <div className="content-frame-body content-frame-body-left">
            <MainView
              character={this.state.character}
              onCharacterUpdated={this.onCharacterUpdated}
              user={this.state.user} />
          </div>

        </div>
      </div>
    </div>
    );
  }
});

function render () {
  var route = window.location.hash.substr(1);
  React.render(<Game route={route} />, document.querySelector('#mainMountNode'));
}

window.addEventListener('hashchange', render);
render();