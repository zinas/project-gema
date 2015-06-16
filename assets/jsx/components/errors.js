var React = require('React');

module.exports = React.createClass({
  render: function() {
    var html = '';
/*
        this.props.errors.logs.map(function (error) {
          return (
            <div class="alert alert-danger" role="alert">
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </div>
          )
        })
 */

    if ( this.props.errors ) {
      html = (
        // for ( var attr in this.props.errors.invalidAttributes ) {
        //   this.props.errors.invalidAttributes[attr].map(function (attribute) {
        //     return (
        //       <div class="alert alert-danger" role="alert">
        //         <strong>{attr}</strong> {attribute.message}
        //       </div>
        //     )
        //   })
        // }
      );
    }
    return (
      <div>
        {html}
      </div>
    );
  }
});