var
  React = require('react'),
  data = require('../../js/lib/data'),
  AreaInformation = require('../components/area-information.jsx'),
  Map = require('../components/map.jsx'),
  MoveControls = require('../components/move-controls.jsx'),
  CombatLog = require('../components/combat-log.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      level: {
        areas: []
      },
      area: data('area'),
      fight: {
        attacker: {},
        defender: {},
        log: [],
        winner: '',
        xp: 0,
        dollars: 0
      }
    };
  },
  onAreaChange: function (area) {
    var character = this.props.character;
    var newArea = {};
    // character.area = cleanArea;
    for (var i in area) {
      if ( area.hasOwnProperty(i) && i !== 'characters' && i !== 'monsters' ) {
        newArea[i] = area[i];
      }
    }

    character.location = newArea;
    this.props.onCharacterUpdated(character);

    this.setState({area: area});
  },
  onLevelChange: function (level) {
    this.setState({level: level});
  },
  onResult: function (fight) {
    this.props.onCharacterUpdated(fight.attacker);
    this.setState({
      fight: {
        attacker: fight.attacker,
        defender: fight.defender,
        log: fight.log,
        winner: fight.result.winner,
        xp: fight.result.xp,
        dollars: fight.result.dollars
      }
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <Map level={this.props.character.continent} current={this.props.character.location}/>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-3">
            <MoveControls character={this.props.character} onMove={this.onAreaChange} />
          </div>
          <div className="col-md-12 col-lg-4 col-xl-6">
            <AreaInformation
              character={this.props.character}
              area={this.state.area}
              level={this.props.character.continent}
              onResult={this.onResult} />
          </div>
        </div>
        <div className="col-xs-12">
          <CombatLog fight={this.state.fight} />
        </div>
      </div>

    );
  }
});