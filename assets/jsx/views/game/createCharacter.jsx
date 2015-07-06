var
  React = require('react'),
  CharacterCreateForm = require('../../components/character-create-form.jsx'),
  Errors = require('../../components/errors.jsx');

var CreateCharacter = React.createClass({
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
        <div className="page-title">
          <h2>Create your character</h2>
        </div>
        <Errors errors={this.state.errors} />
        <CharacterCreateForm onError={this.handleErrors} />
      </div>
    );
  }
});

React.render(<CreateCharacter />, document.querySelector('#mainMountNode'));