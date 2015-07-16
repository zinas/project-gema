var
  React = require('react'),
  data = require('./../../js/lib/data');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      stats: data('stats')
    };
  },
  reset: function (e) {
    var conf = confirm('Are you sure you want to reset? Your character will go back to level 1, but will keep all his money and items');
    if (conf) {
      io.socket.get('/game/reset');
      setTimeout(function () {
        window.location.href = '/game/play';
      }, 1000);
    }

    e.preventDefault();
  },
  reprogram: function (e) {
    alert('Feature not implemented yet. If you want to plan ahead, cost will be $10k per level, and you will be able to reprogram 1/week');
    e.preventDefault();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6">

          <div className="panel panel-default">
            <div className="panel-body">
              <ul className="list-group border-bottom">
                <li className="list-group-item">
                  Aim
                  <span className="badge">{this.state.stats.aim}</span>
                </li>
                <li className="list-group-item">
                  Speed
                  <span className="badge">{this.state.stats.speed}</span>
                </li>
                <li className="list-group-item">
                  Stamina
                  <span className="badge">{this.state.stats.stamina}</span>
                </li>
                <li className="list-group-item">
                  Attack
                  <span className="badge">{this.state.stats.attack}</span>
                </li>
                <li className="list-group-item">
                  Defence
                  <span className="badge">{this.state.stats.defence}</span>
                </li>
                <li className="list-group-item">
                  Armor
                  <span className="badge">{this.state.stats.armor}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-body">
              <p>Your Avatar is a synthetic being, made from your own DNA and containing your memories and your feelings.</p>
              <p>When your Avatar dies a new one is created and your memories are automatically transfered to it.</p>
              <p>If you wish, you can kill your Avatar and start with a new one. However doing so will destroy all your upgrades and modifications.</p>
              <p><a href="" onClick={this.reset} className="text-danger">Destroy Avatar</a></p>
              (You will become level 1, loosing all your attribute and skill points. You will retain your money and any items you have found)
            </div>
          </div>

        </div>
        <div className="col-xs-6">

          <div className="panel panel-default">
            <div className="panel-body">
              <ul className="list-group border-bottom">
                <li className="list-group-item">
                  Damage
                  <span className="badge">{this.state.stats.damage}</span>
                </li>
                <li className="list-group-item">
                  Graze Chance
                  <span className="badge">{this.state.stats.grazeThreshold}</span>
                </li>
                <li className="list-group-item">
                  Graze Multiplier
                  <span className="badge">{this.state.stats.grazeMult}</span>
                </li>
                <li className="list-group-item">
                  Hit Chance
                  <span className="badge">{this.state.stats.hitThreshold}</span>
                </li>
                <li className="list-group-item">
                  Crit Chance
                  <span className="badge">{this.state.stats.critThreshold}</span>
                </li>
                <li className="list-group-item">
                  Crit Multiplier
                  <span className="badge">{this.state.stats.critMult}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-body">
              <p>You can reprogram your Avatar, diverting all his core energy to different skills and abilities.</p>
              <p>This will not weaken your Avatar at all, but it is a process that costs a lot of dollars and it is so
              exhausting, that your Avatar needs some time to recover.</p>
              <p><a href="" onClick={this.reprogram} className="text-danger">Reprogram Avatar</a></p>
              (You will reset all your skills and attributes, while you retain your level. This means that you can spend those points from scratch to any skill and attribute you wish)
            </div>
          </div>

        </div>
      </div>
    );
  }
});