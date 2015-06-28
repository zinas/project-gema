var
  React = require('React'),
  cn = require('classnames');

module.exports = React.createClass({
  getInitialState: function () {
    return {};
  },
  onClick: function () {
  },
  renderLog: function (log) {
    switch (log.what) {
      case 'round':
        return <h4>Round {log.value}</h4>;
      case 'initiative':
        return (
          <div className="item item-visible item-stretch">
            <div className="text">
              <strong>{log.actor.name}</strong> has won initiative
            </div>
          </div>
        );
      case 'hit':
        return (
          <div className={cn('item item-visible', {'in': this.props.fight.defender.id === log.actor.id})}>
            <div className="image">
              <img src="/images/no-image.jpg" />
            </div>
            <div className="text">
              <div className="heading"><strong>{log.actor.name}</strong></div>
              has rolled <span className="text-primary">{log.roll}</span> and hits
              for {log.damage}
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
          </div>
        );
      case 'crit':
        return (
          <div className={cn('item item-visible', {'in': this.props.fight.defender.id === log.actor.id})}>
            <div className="image">
              <img src="/images/no-image.jpg" />
            </div>
            <div className="text">
              <div className="heading"><strong>{log.actor.name}</strong></div>
              has rolled <span className="text-primary">{log.roll}</span> and <span className="text-success">crits</span>
              for {log.damage}
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
          </div>
        );
      case 'graze':
        return (
          <div className={cn('item item-visible', {'in': this.props.fight.defender.id === log.actor.id})}>
            <div className="image">
              <img src="/images/no-image.jpg" />
            </div>
            <div className="text">
              <div className="heading"><strong>{log.actor.name}</strong></div>
              has rolled <span className="text-primary">{log.roll}</span> and <span className="text-muted">grazes</span>
              for {log.damage}
              <p><strong>{log.victim.name}</strong> has {log.hpLeft} hit points left</p>
            </div>
          </div>
        );
      case 'miss':
        return (
          <div className={cn('item item-visible', {'in': this.props.fight.defender.id === log.actor.id})}>
            <div className="image">
              <img src="/images/no-image.jpg" />
            </div>
            <div className="text">
              <div className="heading"><strong>{log.actor.name}</strong></div>
              has rolled <span className="text-primary">{log.value}</span> and <span className="text-danger">misses</span>
            </div>
          </div>
        );
      case 'result':
        return (
          <div className="item item-visible item-stretch">
            <div className="text">
              <strong>{log.winner.name}</strong> wins
            </div>
          </div>
        );
      case 'skill':
        return (
          <div className={cn('item item-visible', {'in': this.props.fight.defender.id === log.actor.id})}>
            <div className="image">
              <img src="/images/no-image.jpg" />
            </div>
            <div className="text">
              <div className="heading"><strong>{log.actor.name}</strong></div>
              uses <span className="text-info">{skill.details.name}</span> and rolls {log.value}
            </div>
          </div>
        );
    }
  },
  render: function() {
    return (
      <div className="messages messages-img">
      {this.props.fight.log.map( (function (log, i) {
        return (
          <div key={i}>
            {this.renderLog(log)}
          </div>
        )
      }).bind(this)) }
      </div>
    );
  }
});