var
  React = require('react'),
  data = require('./../../../js/lib/data'),
  Hud = require('./../../components/hud.jsx'),
  TopNavigation = require('./../../components/top-navigation.jsx'),
  Popup = require('./../../components/popup.jsx'),
  Chat = require('./../../components/chat.jsx');

var Game = React.createClass({
  getInitialState: function () {
    return {
      character: data('character'),
      user: data('user')
    };
  },
  onCharacterUpdated: function (character) {
    if ( character.xp >= character.level * 1000 ) {
      require('pubsub-js').publish('show-popup', {
        box: 'warning',
        title: 'Avatar circuits upgraded',
        content: 'Your Avatar has adapted his circuits for optimal performance.',
        onClose: function () {
          window.location.href = '/game/play';
        }
      });
    }
    this.setState({character: character});
  },
  render: function() {
    var MainView, title;
    switch (this.props.route) {
      case 'upgrades':
        MainView = require('../../partials/upgrades.jsx');
        title = 'Avatar upgrades';
        break;
      case 'statistics':
        MainView = require('../../partials/statistics.jsx');
        title = 'Avatar statistics';
        break;
      case 'inventory':
        MainView = require('../../partials/inventory.jsx');
        title = 'Equipment';
        break;
      case 'explore':
      default:
        MainView = require('../../partials/explore.jsx');
        title = 'Explore';
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

          <div className="content-wrapper">
            <div className="main-container">
              <MainView
                character={this.state.character}
                onCharacterUpdated={this.onCharacterUpdated}
                user={this.state.user} />
            </div>
            <div className="chat-container">
              <Chat character={this.state.character} />
            </div>
          </div>
        </div>
      </div>
      <Popup />
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