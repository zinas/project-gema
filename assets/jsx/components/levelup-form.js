var
  React = require('React'),
  utils = require('./../../js/lib/utils');

var LevelupForm = React.createClass({
  getInitialState: function () {
    return {
      skills: [],
      character: {},
      unassignedSkillPoints: thegrid.config.LEVELUP.SKILL_POINTS,
      unassignedAttributePoints: thegrid.config.LEVELUP.ATTRIBUTE_POINTS
    }
  },
  reloadState: function (props) {
    this.setState({
      character: props.character,
      unassignedSkillPoints:
        (props.character.level - props.character.currentLevel) * thegrid.config.LEVELUP.SKILL_POINTS,
      unassignedAttributePoints:
        (props.character.level - props.character.currentLevel) * thegrid.config.LEVELUP.ATTRIBUTE_POINTS,
    });
    utils.ajax('/skill', {
      profession: props.character.profession
    }).then( (function (skills) {
      this.setState({skills: skills});
    }).bind(this) );
  },
  skill: function (id) {
    var skill = {};
    this.state.skills.forEach(function (s) {
      if ( s.id === id ) {
        skill = s;
      }
    });

    return skill;
  },
  componentDidMount: function () {
    this.reloadState(this.props);
  },
  componentWillReceiveProps: function (props) {
    this.reloadState(props);
  },
  render: function() {
    var skills, attributes;

    if ( this.props.character.currentLevel < this.props.character.level ) {
      attributes = (
        <div>
        <div className="form-group">
          <label>Unassigned attribute points</label> <strong>{this.state.unassignedAttributePoints}</strong>
        </div>
        <div className="form-group">
          <table className="stats">
            <tr>
              <td>Aim</td>
              <td>{this.state.character.aim}</td>
              <td><button>+</button></td>
              <td><button>-</button></td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{this.state.character.speed}</td>
              <td><button>+</button></td>
              <td><button>-</button></td>
            </tr>
            <tr>
              <td>Stamina</td>
              <td>{this.state.character.stamina}</td>
              <td><button>+</button></td>
              <td><button>-</button></td>
            </tr>
          </table>
        </div>
        </div>
      );

      skills = (
        <div>
        <div className="form-group">
          <label>Unassigned skill points</label> <strong>{this.state.unassignedSkillPoints}</strong>
        </div>

        <div className="form-group">
          <table className="stats">
            {this.state.character.skills.map( (function (s) {
              var skill = this.skill(s.skill);
              return (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{s.level}</td>
                  <td><button>+</button></td>
                  <td><button>-</button></td>
                </tr>
              );
            }).bind(this) )}
          </table>
        </div>
        </div>
      );
    }

    return (
      <div className="form">
        <div className="form-group">
          {this.props.character.name}, ({this.props.character.profession} lvl. {this.props.character.level})
        </div>
        {attributes}
        {skills}
      </div>
    );
  }
});

module.exports = LevelupForm;