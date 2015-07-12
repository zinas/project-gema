var React = require('react');

module.exports = React.createClass({
  heal: function () {
    io.socket.get('/game/heal', (function () {
      var character = this.props.character;
      character.currentHP = character.maxHP;
      character.dollars = character.dollars - this.getCost();
      this.props.onCharacterUpdated(character);
    }).bind(this));
    return false;
  },
  getCost: function () {
    return parseInt(this.props.character.dollars * 0.05);
  },
  render: function() {
    var sidebar = '';
    if ( this.props.character && this.props.character.name ) {
      sidebar = (
      <ul className="x-navigation">
        <li className="logo">
          <a href="/game/play#explore">Project Gema</a>
          <a href="" className="x-navigation-control"></a>
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
          <div>
            HP: {this.props.character.currentHP} / {this.props.character.maxHP}
            &nbsp;&nbsp;<a href="" onClick={this.heal} className="text-warning">Heal</a>
            &nbsp;&nbsp;(<span className="text-success">$ {this.getCost()}</span>)
          </div>
          <div className="progress progress-small">
            <div className="progress-bar progress-bar-colorful" role="progressbar"
              style={{width: (this.props.character.currentHP*100/this.props.character.maxHP)+'%'}}></div>
          </div>
          <div>XP: {this.props.character.xp} / {this.props.character.level * 1000}</div>
          <div className="progress progress-small">
            <div className="progress-bar progress-bar-warning" role="progressbar"
              style={{width: ((this.props.character.xp*100)/(this.props.character.level * 1000))+'%'}}></div>
          </div>
          <p>Bank account: <span className="text-success">$ {this.props.character.dollars}</span></p>
        </li>
        <li>
          <a href="/game/play#explore">
            <span className="fa fa-globe"></span>
            <span className="xn-text">Explore</span>
          </a>
        </li>
        <li>
          <a href="/game/play#character">
            <span className="glyphicon glyphicon-dashboard"></span>
            <span className="xn-text">Vital Signs</span>
          </a>
        </li>
        <li>
        </li>
        <li>
          <a href="/game/play#inventory">
            <span className="fa fa-suitcase"></span>
            <span className="xn-text">Equipment</span>
          </a>
        </li>
        <li>
          <a href="/game/play#market">
            <span className="fa fa-money"></span>
            <span className="xn-text">Black Market</span>
          </a>
        </li>
        <li>
          <a href="/encyclopedia">
            <span className="fa fa-book"></span>
            <span className="xn-text">Encyclopedia</span>
          </a>
        </li>
        <li>
          <a href="/game/play#guild">
            <span className="fa fa-group"></span>
            <span className="xn-text">Connections</span>
          </a>
        </li>
        <li>
          <a href="/news">
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