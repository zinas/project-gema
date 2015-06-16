var
  React = require('React'),
  CharacterCreateForm = require('./../../components/character-create-form'),
  Errors = require('./../../components/errors');

var CharacterCreateView = React.createClass({
  getInitialState: function () {
    return {
      errors: {}
    };
  },
  handleErrors: function (errors) {
    this.setState({errors: errors});
  },
  render: function() {
    return (
      <div>
        <Errors errors={this.state.errors} />
        <CharacterCreateForm onError={this.handleErrors} />
      </div>
    );
  }
});
React.render(<CharacterCreateView />, document.getElementById('mainMountNode') );