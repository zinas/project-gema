var
  React = require('React'),
  utils = require('./../../js/lib/utils');

var LevelupForm = React.createClass({
  getInitialState: function () {
    return {
      skills: [],
      character: {
        aim: 10,
        speed: 10,
        stamina: 10,
        level: 1,
        skills: []
      }
    }
  },
  reloadState: function (props) {
    this.setState({
      character: props.character
    });
    io.socket.get('/skill', {
      or: [
        {profession: props.character.profession},
        {profession: 'all'}
      ]
    }, (function (skills) {
      this.setState({skills: skills});
    }).bind(this));
  },
  getUnassignedAttributes: function () {
    return (
      (this.state.character.level - 1)  * thegrid.config.LEVELUP.ATTRIBUTE_POINTS
      + 10 - this.state.character.aim
      + 10 - this.state.character.speed
      + 10 - this.state.character.stamina
    );
  },
  getUnassignedSkills: function () {
    var
      total = (this.state.character.level - 1)  * thegrid.config.LEVELUP.SKILL_POINTS,
      current = 0;

    this.state.character.skills.forEach(function (skill) {
      current += skill.level;
    });
    return total - current;
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
  increaseAttribute: function (e) {
    var character = this.state.character;
    character[e.target.getAttribute('data-target')] += 1;

    this.setState({character: character});
  },
  increaseSkill: function (e) {
    var character = this.state.character;
    character.skills[e.target.getAttribute('data-target')].level += 1;

    this.setState({character: character});
  },
  saveCharacter: function (e) {
    io.socket.put('/character/'+this.state.character.id, {
      aim: this.state.character.aim,
      speed: this.state.character.speed,
      stamina: this.state.character.stamina
    }, function ( character , resp) {
    });

    this.state.character.skills.forEach( (function (s) {
      io.socket.put('/characterSkill/'+s.id, {
        level: s.level,
      }, function ( skill , resp) {
        console.log(skill);
      });
    }).bind(this) );
  },
  componentDidMount: function () {
    this.reloadState(this.props);
  },
  componentWillReceiveProps: function (props) {
    this.reloadState(props);
  },
  render: function() {
    return (
      <div className="form">
        <div className="form-group">
          {this.props.character.name}, ({this.props.character.profession} lvl. {this.props.character.level})
        </div>

        <div className="form-group">
          <label>Unassigned attribute points</label> <strong>{this.getUnassignedAttributes()}</strong>
        </div>
        <div className="form-group">
          <table className="stats">
            <tr>
              <td>Aim</td>
              <td>{this.state.character.aim}</td>
              <td>
                <button
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="aim"
                  onClick={this.increaseAttribute}>+</button>
              </td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{this.state.character.speed}</td>
              <td>
                <button
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="speed"
                  onClick={this.increaseAttribute}>+</button>
                </td>
            </tr>
            <tr>
              <td>Stamina</td>
              <td>{this.state.character.stamina}</td>
              <td>
                <button
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="stamina"
                  onClick={this.increaseAttribute}>+</button>
                </td>
            </tr>
          </table>
        </div>

        <div className="form-group">
          <label>Unassigned skill points</label> <strong>{this.getUnassignedSkills()}</strong>
        </div>

        <div className="form-group">
          <table className="stats">
            {this.state.character.skills.map( (function (s, i) {
              var skill = this.skill(s.skill);
              return (
                <tr key={s.skill}>
                  <td>{skill.name}</td>
                  <td>{s.level}</td>
                  <td>
                    <button
                      disabled={this.getUnassignedSkills() <= 0}
                      data-target={i}
                      onClick={this.increaseSkill}>+</button>
                  </td>
                </tr>
              );
            }).bind(this) )}
          </table>
        </div>
        <div className="form-group">
          <button onClick={this.saveCharacter}>Save Character</button>
        </div>
      </div>
    );
  }
});

module.exports = LevelupForm;