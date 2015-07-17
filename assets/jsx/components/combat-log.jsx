var
  React = require('react'),
  cn = require('classnames'),
  Item = require('./item.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      expanded: false
    };
  },
  toggleExpand: function (e) {
    e.preventDefault();
    this.setState({expanded: !this.state.expanded})
  },
  isWin: function () {
    return this.props.fight.winner === 'attacker';
  },
  renderLog: function (log) {
    switch (log.what) {
      case 'round':
        return <h4>Round {log.value}</h4>;
      case 'initiative':
        return (
            <div className="text">
              <strong>{log.actor}</strong> has won initiative
            </div>
        );
      case 'hit':
        return (
            <div className="text">
              <strong>{log.actor}</strong> has rolled <span className="text-primary">{log.roll}</span>&nbsp;
              and hits for {log.damage}<br/>
              <p><strong>{log.victim}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'crit':
        return (
            <div className="text">
              <strong>{log.actor}</strong> has rolled&nbsp;
              <span className="text-primary">{log.roll}</span>&nbsp;
              and <span className="text-success">crits</span> for {log.damage}<br />
              <p><strong>{log.victim}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'graze':
        return (
            <div className="text">
              <strong>{log.actor}</strong>&nbsp;
              has rolled <span className="text-primary">{log.roll}</span> and&nbsp;
              <span className="text-muted">grazes</span> for {log.damage}<br />
              <p><strong>{log.victim}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'miss':
        return (
            <div className="text">
              <strong>{log.actor}</strong>&nbsp;
              has rolled <span className="text-primary">{log.value}</span> and <span className="text-danger">misses</span>
            </div>
        );
      case 'result':
        return (
            <div className="text">
              <strong>{log.winner}</strong> wins
            </div>
        );
      case 'skill':
        return (
          <div className={cn('item item-visible')}>
            <div className="text">
              <strong>{log.actor}</strong>&nbsp;
              uses <span className="text-info">{log.which}</span> for {log.value}
            </div>
          </div>
        );
    }
  },
  renderStat: function (name, yours, opponents) {
    var positive = yours > opponents;
    var negative = yours < opponents;
    return (
      <li className="list-group-item">
        {name}
        <span className={cn('badge', {
          'badge-success':positive,
          'badge-danger': negative
        })}>{positive ? '+' : ''}{(yours-opponents)}</span>
      </li>
    );
  },
  render: function() {
    return (
      <div className={cn('clearfix', {'hidden': this.props.fight.log.length === 0})}>
        <a
          href="#"
          onClick={this.toggleExpand}
          className={cn('tile tile-default')}>
            {this.isWin()?'Win':'Loose'}
            <p>
              Gained <span className="text-info">{this.props.fight.xp}</span> xp and <span className="text-success">$ {this.props.fight.dollars}</span>
            </p>
            {this.props.fight.item ? (
            <div>
              <h4>You found an item!</h4>
              <Item item={this.props.fight.item} />
            </div>
            ) : ''}
        </a>
        <div className={cn('row', {hidden: !this.state.expanded})}>
          <div className="col-xs-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="list-group border-bottom">
                  {this.renderStat('Aim', this.props.fight.attacker.stats.aim, this.props.fight.defender.stats.aim)}
                  {this.renderStat('Speed', this.props.fight.attacker.stats.speed, this.props.fight.defender.stats.speed)}
                  {this.renderStat('Stamina', this.props.fight.attacker.stats.stamina, this.props.fight.defender.stats.stamina)}
                  {this.renderStat('Attack', this.props.fight.attacker.stats.attack, this.props.fight.defender.stats.attack)}
                  {this.renderStat('Defence', this.props.fight.attacker.stats.defence, this.props.fight.defender.stats.defence)}
                  {this.renderStat('Armor', this.props.fight.attacker.stats.armor, this.props.fight.defender.stats.armor)}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="list-group border-bottom">
                  {this.renderStat('Damage', this.props.fight.attacker.stats.damage, this.props.fight.defender.stats.damage)}
                  {this.renderStat('Graze Chance', this.props.fight.attacker.stats.grazeThreshold, this.props.fight.defender.stats.grazeThreshold)}
                  {this.renderStat('Graze Multiplier', this.props.fight.attacker.stats.grazeMult, this.props.fight.defender.stats.grazeMult)}
                  {this.renderStat('Hit Chance', this.props.fight.attacker.stats.hitThreshold, this.props.fight.defender.stats.hitThreshold)}
                  {this.renderStat('Crit Chance', this.props.fight.attacker.stats.critThreshold, this.props.fight.defender.stats.critThreshold)}
                  {this.renderStat('Crit Multiplier', this.props.fight.attacker.stats.critMult, this.props.fight.defender.stats.critMult)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('messages', {hidden: !this.state.expanded})}>
        {this.props.fight.log.map( (function (log, i) {
          return (
            <div key={i} className="item item-visible">
              {this.renderLog(log)}
            </div>
          )
        }).bind(this)) }
        </div>
      </div>
    );
  }
});