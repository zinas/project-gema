var React = require('React');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      errors: [],
      summary: ''
    };
  },
  componentDidMount: function () {
    this.parseErrors(this.props.errors);
  },
  componentWillReceiveProps: function (props) {
    this.parseErrors(props.errors);
  },
  parseErrors: function (errors) {
    if ( !errors.invalidAttributes ) return;
    var stateErrors = [errors.summary];
    for ( var i in errors.invalidAttributes ) {
      errors.invalidAttributes[i].forEach(function (err) {
        stateErrors.push('<strong>'+i+'</strong> '+err.message);
      });
    }
    this.setState({errors: stateErrors});
  },
  render: function() {
    return (
      <div>
        {this.state.errors.map(function (error, i) {
          return (
            <div key={i}
              className="alert alert-danger"
              dangerouslySetInnerHTML={{__html: error}}>
            </div>
          )
        })}
      </div>
    );
  }
});