var
  React = require('react'),
  explain = require('./../../js/lib/explain'),
  data = require('./../../js/lib/data');

var CharacterSheet = React.createClass({
  getInitialState: function () {
    return {
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
    this.setState({character: props.character});
  },
  getUnassignedAttributes: function () {
    return (
      (this.state.character.level - 1)  * data('config').LEVELUP.ATTRIBUTE_POINTS
      + 10 - this.state.character.aim
      + 10 - this.state.character.speed
      + 10 - this.state.character.stamina
    );
  },
  getUnassignedSkills: function () {
    var
      total = (this.state.character.level - 1)  * data('config').LEVELUP.SKILL_POINTS,
      current = 0;

    this.state.character.skills.forEach(function (skill) {
      current += skill.level;
    });
    return total - current;
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
    io.socket.post(
      '/character/levelup/'+this.state.character.id,
      this.state.character,
      (function (data) {

      }).bind(this));

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
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <table className="table table-bordered table-striped table-actions">
          <tbody>
            <tr>
              <td>
                <p><strong>Aim</strong></p>
                <p>Aim is your characters ability to shoot more reliably. It has a major effect on your characters attack (and thus chances to hit, graze or crit) and also a moderate effect on the characters damage</p>
              </td>
              <td className="middle">{this.state.character.aim}</td>
              <td className="middle">
                <button
                  className="btn btn-success btn-rounded btn-condensed btn-sm"
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="aim"
                  onClick={this.increaseAttribute}>+</button>
              </td>
            </tr>
            <tr>
              <td>
                <p><strong>Speed</strong></p>
                <p>Speed is your characters overall movement capabilities during combat. It has a minor effect on attack, major effect on defence and minor effect on damage.</p>
              </td>
              <td className="middle">{this.state.character.speed}</td>
              <td className="middle">
                <button
                  className="btn btn-success btn-rounded btn-condensed btn-sm"
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="speed"
                  onClick={this.increaseAttribute}>+</button>
                </td>
            </tr>
            <tr>
              <td>
                <p><strong>Stamina</strong></p>
                <p>Stamina represents your overall endurance during a fight. Stamina has a minor effect on your defence and a major effect on your armor</p>
              </td>
              <td className="middle">{this.state.character.stamina}</td>
              <td className="middle">
                <button
                  className="btn btn-success btn-rounded btn-condensed btn-sm"
                  disabled={this.getUnassignedAttributes() <= 0}
                  data-target="stamina"
                  onClick={this.increaseAttribute}>+</button>
                </td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right">
                Unassigned attribute points <strong className="label label-info">{this.getUnassignedAttributes()}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={this.saveCharacter}>Save Character</button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
        <div className="col-md-12 col-lg-6">
          <table className="table table-bordered table-striped table-actions">
          <tbody>
            {this.state.character.skills.map( (function (skill, i) {
              return (
                <tr key={skill.skill}>
                  <td>
                    <p><strong>{skill.details.name}</strong></p>
                    <p>{skill.details.description}</p>
                    <div dangerouslySetInnerHTML={{__html:explain(skill.details.action)}}></div>
                  </td>
                  <td className="middle">{skill.level}</td>
                  <td className="middle">
                    <button
                      className="btn btn-success btn-rounded btn-condensed btn-sm"
                      disabled={this.getUnassignedSkills() <= 0}
                      data-target={i}
                      onClick={this.increaseSkill}>+</button>
                  </td>
                </tr>
              );
            }).bind(this) )}
            <tr>
              <td colSpan="3" className="text-right">
                Unassigned skill points <strong className="label label-info">{this.getUnassignedSkills()}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={this.saveCharacter}>Save Character</button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = CharacterSheet;