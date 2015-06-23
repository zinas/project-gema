var React = require('React');

module.exports = React.createClass({
  render: function() {
    var sidebar = '';
    if ( this.props.character && this.props.character.name ) {
      sidebar = (
      <ul className="x-navigation">
        <li className="xn-logo">
          <a href="index.html">The Grid</a>
          <a href="#" className="x-navigation-control"></a>
        </li>
        <li className="xn-title">HUD unit</li>
        <li className="xn-profile">
          <div className="profile">
            <div className="profile-image">
              <img src="/images/no-image.jpg" alt="John Doe" />
            </div>
            <div className="profile-data">
              <div className="profile-data-name">{this.props.character.name}</div>
              <div className="profile-data-title">
                {this.props.character.profession.name}
                (Lvl. {this.props.character.level})
              </div>
            </div>
          </div>
        </li>
        <li className="xn-title">
          <div>HP: {this.props.character.currentHP} / {this.props.character.maxHP}</div>
          <div className="progress progress-small">
            <div className="progress-bar progress-bar-danger" role="progressbar"
              style={{width: (this.props.character.currentHP*100/this.props.character.maxHP)+'%'}}></div>
          </div>
          <div>XP: {this.props.character.xp} / {this.props.character.level * 1000}</div>
          <div className="progress progress-small">
            <div className="progress-bar progress-bar-warning" role="progressbar"
              style={{width: ((this.props.character.xp*100)/(this.props.character.level * 1000))+'%'}}></div>
          </div>
        </li>
        <li>
          <a href="/game/explore">
            <span className="fa fa-globe"></span>
            <span className="xn-text">Explore</span>
          </a>
        </li>
        <li>
          <a href="/game/character">
            <span className="glyphicon glyphicon-dashboard"></span>
            <span className="xn-text">Vital Signs</span>
          </a>
        </li>
        <li>
        </li>
        <li>
          <a href="/game/inventory">
            <span className="fa fa-suitcase"></span>
            <span className="xn-text">Equipment</span>
          </a>
        </li>
        <li>
          <a href="/encyclopedia">
            <span className="fa fa-book"></span>
            <span className="xn-text">Encyclopedia</span>
          </a>
        </li>
        <li>
          <a href="/game/guild">
            <span className="fa fa-group"></span>
            <span className="xn-text">Connections</span>
          </a>
        </li>
        <li>
          <a href="/game/news">
            <span className="glyphicon glyphicon-volume-up"></span>
            <span className="xn-text">Intelligence Network</span>
          </a>
        </li>
      </ul>
      );
    } else {
      sidebar = (
      <ul className="x-navigation">
        <li className="xn-logo">
          <a href="index.html">The Grid</a>
          <a href="#" className="x-navigation-control"></a>
        </li>
        <li className="xn-title">As soon as you complete your character, you will be given your personal HUD unit, which will appear here.</li>
      </ul>
      );
    }

    return (
      <div>{sidebar}</div>
    );
  }
});