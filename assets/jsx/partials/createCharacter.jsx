var
  React = require('react'),
  CharacterCreateForm = require('../components/character-create-form.jsx'),
  Errors = require('../components/errors.jsx');

module.exports = React.createClass({
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