var
  React = require('React'),
  ClassSelector = require('./class-selector');

var CharacterCreateForm = React.createClass({
  getInitialState: function () {
    return { profession: {name: '', description: ''} };
  },
  onProfessionChanged: function (profession) {
    this.setState({profession: profession});
  },
  onSubmit: function (e) {
    var data = {
      name: React.findDOMNode(this.refs.name).value,
      profession: React.findDOMNode(this.refs.profession).value
    };

    io.socket.post('/character', data, function (data) {
      alert('Character created');
    });

    e.preventDefault();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <form method="POST" className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" ref="name" type="text" placeholder="Character name" name="character[name]" />
            </div>

            <div className="form-group">
              <label>Profession</label>
              <ClassSelector onChange={this.onProfessionChanged} name="character[profession]" ref="profession" />
            </div>

            <div className="form-group">
              <input className="btn btn-primary" type="submit" name="character[submit]" value="Create" />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Create your character</h3>
            </div>
            <div className="panel-body">
              <p>Choose a name and a profession for your character. Every user can only have one character,
              so think about your choice for a moment, since you won't be able to change it later</p>
              <p>You character's name will appear on every interaction with other users. In this game,
              your character is your alter ego.</p>
            </div>
          </div>

          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">{this.state.profession.name}</h3>
            </div>
            <div className="panel-body">
              <p>{this.state.profession.description}</p>
            </div>
          </div>

          <div className="panel">
            <div className="panel-body list-group">
              <ul className="list-group border-bottom">
                <li className="list-group-item">
                  HP per level<span className="badge badge-danger">{this.state.profession.hp}</span>
                </li>
                <li className="list-group-item">
                  Attack per level<span className="badge badge-danger">{this.state.profession.attack}</span>
                </li>
                <li className="list-group-item">
                  Defence per level<span className="badge badge-danger">{this.state.profession.defence}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="panel">
            <div className="panel-body">
              <p>TODO: add skills description</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CharacterCreateForm;

