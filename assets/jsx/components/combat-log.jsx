var
  React = require('react'),
  cn = require('classnames');

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
              <strong>{log.actor.name}</strong> has won initiative
            </div>
        );
      case 'hit':
        return (
            <div className="text">
              <strong>{log.actor.name}</strong> has rolled <span className="text-primary">{log.roll}</span>&nbsp;
              and hits for {log.damage}<br/>
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'crit':
        return (
            <div className="text">
              <strong>{log.actor.name}</strong> has rolled&nbsp;
              <span className="text-primary">{log.roll}</span>&nbsp;
              and <span className="text-success">crits</span> for {log.damage}<br />
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'graze':
        return (
            <div className="text">
              <strong>{log.actor.name}</strong>&nbsp;
              has rolled <span className="text-primary">{log.roll}</span> and&nbsp;
              <span className="text-muted">grazes</span> for {log.damage}<br />
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
        );
      case 'miss':
        return (
            <div className="text">
              <strong>{log.actor.name}</strong>&nbsp;
              has rolled <span className="text-primary">{log.value}</span> and <span className="text-danger">misses</span>
            </div>
        );
      case 'result':
        return (
            <div className="text">
              <strong>{log.winner.name}</strong> wins
            </div>
        );
      case 'skill':
        return (
          <div className={cn('item item-visible')}>
            <div className="text">
              <strong>{log.actor.name}</strong>&nbsp;
              uses <span className="text-info">{skill.details.name}</span> and rolls {log.value}
            </div>
          </div>
        );
    }
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
        </a>
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