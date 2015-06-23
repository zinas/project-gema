var React = require('React');

module.exports = React.createClass({
  render: function() {
    return (
    <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
      <li className="xn-icon-button pull-right last active">
        <a href="#"><span className="fa fa-power-off"></span></a>
        <ul className="xn-drop-left animated zoomIn">
          <li>
            <a href="/account/settings"><span className="fa fa-wrench"></span> Account settings</a>
          </li>
          <li>
            <a href="/logout" className="mb-control" data-box="#mb-signout">
              <span className="fa fa-sign-out"></span> Sign Out
            </a>
          </li>
        </ul>
      </li>
      <li className="pull-right">
        <a>{this.props.user.email}</a>
      </li>
    </ul>
    );
  }
});