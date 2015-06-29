var
  React = require('react'),
  CharacterCreateForm = require('./../../components/character-create-form'),
  Errors = require('./../../components/errors'),
  data = require('./../../../js/lib/data.js'),
  Hud = require('./../../components/hud'),
  TopNavigation = require('./../../components/top-navigation'),
  Chat = require('./../../components/chat');


var CharacterCreateView = React.createClass({
  getInitialState: function () {
    return {
      character: data('character'),
      user: data('user'),
      errors: {}
    };
  },
  handleErrors: function (errors) {
    this.setState({errors: errors});
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
            <Errors errors={this.state.errors} />
            <CharacterCreateForm onError={this.handleErrors} />
          </div>

        </div>
      </div>
    </div>
    );
  }
});
React.render(<CharacterCreateView />, document.getElementById('mainMountNode') );